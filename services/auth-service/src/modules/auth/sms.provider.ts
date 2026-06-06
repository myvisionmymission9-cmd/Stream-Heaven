import { Injectable, Logger } from '@nestjs/common';

export interface SmsProvider {
  sendOtp(phone: string, code: string): Promise<void>;
}

@Injectable()
export class MockSmsProvider implements SmsProvider {
  private readonly logger = new Logger(MockSmsProvider.name);

  async sendOtp(phone: string, code: string): Promise<void> {
    const masked = phone.replace(/(\+\d{2})(\d+)(\d{4})/, '$1******$3');
    this.logger.log(`[MOCK SMS] OTP ${code} sent to ${masked}`);
  }
}

/** Twilio-ready adapter — wire credentials via env in production */
@Injectable()
export class TwilioSmsProvider implements SmsProvider {
  private readonly logger = new Logger(TwilioSmsProvider.name);

  async sendOtp(phone: string, code: string): Promise<void> {
    this.logger.warn(`Twilio SMS not configured — would send OTP ${code} to ${phone}`);
    throw new Error('Twilio SMS provider not configured');
  }
}

export const SMS_PROVIDER = 'SMS_PROVIDER';
