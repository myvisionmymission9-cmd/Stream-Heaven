import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  createHash,
  createCipheriv,
  randomBytes,
  randomInt,
} from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { OtpCodeEntity } from '../../database/entities/otp-code.entity';
import { SessionService } from '../session/session.service';
import { SmsProvider, SMS_PROVIDER } from './sms.provider';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpCodeEntity)
    private readonly otpCodes: Repository<OtpCodeEntity>,
    @Inject(SMS_PROVIDER) private readonly sms: SmsProvider,
    private readonly session: SessionService,
    private readonly config: ConfigService,
  ) {}

  hashPhone(phone: string): string {
    return createHash('sha256').update(phone).digest('hex');
  }

  encryptPhone(phone: string): string {
    const keyHex = this.config.get<string>('app.phoneEncryptionKey')!;
    const key = Buffer.from(keyHex, 'hex');
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString('base64');
  }

  maskPhone(phone: string): string {
    return phone.replace(/(\+\d{2})(\d+)(\d{4})/, '$1******$3');
  }

  private generateCode(): string {
    return randomInt(100000, 999999).toString();
  }

  private hashCode(code: string, requestId: string): string {
    return createHash('sha256').update(`${code}:${requestId}`).digest('hex');
  }

  async sendOtp(phone: string) {
    const phoneHash = this.hashPhone(phone);
    const rateLimit = this.config.get<number>('app.otpRateLimitPerHour') ?? 5;
    const count = await this.session.incrementOtpRate(phoneHash);
    if (count > rateLimit) {
      throw new HttpException(
        { code: 'AUTH_OTP_RATE_LIMIT', message: 'Too many OTP requests' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const code = this.generateCode();
    const requestId = uuidv4();
    const ttl = this.config.get<number>('app.otpTtlSeconds') ?? 300;
    const expiresAt = new Date(Date.now() + ttl * 1000);

    await this.otpCodes.delete({ phoneHash });
    await this.otpCodes.save({
      requestId,
      phoneHash,
      codeHash: this.hashCode(code, requestId),
      attempts: 0,
      expiresAt,
    });

    await this.sms.sendOtp(phone, code);

    const response: {
      requestId: string;
      expiresInSeconds: number;
      maskedPhone: string;
      mockOtpCode?: string;
    } = {
      requestId,
      expiresInSeconds: ttl,
      maskedPhone: this.maskPhone(phone),
    };

    const nodeEnv = this.config.get<string>('app.nodeEnv');
    const smsProvider = this.config.get<string>('app.smsProvider');
    if (nodeEnv === 'development' && smsProvider === 'mock') {
      response.mockOtpCode = code;
    }

    return response;
  }

  async verifyOtp(phone: string, code: string, requestId: string) {
    const phoneHash = this.hashPhone(phone);
    const row = await this.otpCodes.findOne({ where: { requestId, phoneHash } });

    if (!row) {
      throw new UnauthorizedException({
        code: 'AUTH_OTP_INVALID',
        message: 'Invalid or expired OTP',
      });
    }

    const maxAttempts = this.config.get<number>('app.otpMaxAttempts') ?? 3;
    if (row.attempts >= maxAttempts) {
      throw new UnauthorizedException({
        code: 'AUTH_OTP_MAX_ATTEMPTS',
        message: 'Too many failed OTP attempts',
      });
    }

    if (row.expiresAt < new Date()) {
      await this.otpCodes.delete({ id: row.id });
      throw new UnauthorizedException({
        code: 'AUTH_OTP_EXPIRED',
        message: 'OTP expired',
      });
    }

    const expectedHash = this.hashCode(code, requestId);
    if (row.codeHash !== expectedHash) {
      row.attempts += 1;
      await this.otpCodes.save(row);
      throw new UnauthorizedException({
        code: 'AUTH_OTP_INVALID',
        message: 'Invalid OTP code',
      });
    }

    await this.otpCodes.delete({ id: row.id });
  }
}
