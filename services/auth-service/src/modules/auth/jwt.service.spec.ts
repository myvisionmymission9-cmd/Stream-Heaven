import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ShJwtService, JwtPayload } from './jwt.service';
import appConfig from '../../config/app.config';
import { UserRole, AppId } from '../../common/enums';

describe('ShJwtService', () => {
  let jwtService: ShJwtService;
  const testUser = {
    id: '018f3a2e-7b4c-7a1e-9c0d-123456789abc',
    roles: [UserRole.USER],
    appAccess: [AppId.SOCIAL, AppId.LIVESTREAM],
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [appConfig] }),
        JwtModule.register({}),
      ],
      providers: [ShJwtService],
    }).compile();

    jwtService = module.get(ShJwtService);
  });

  it('issues access and refresh tokens with correct claims', () => {
    const pair = jwtService.issueTokens(testUser);

    expect(pair.accessToken).toBeDefined();
    expect(pair.refreshToken).toBeDefined();
    expect(pair.expiresIn).toBe(900);

    const accessPayload = jwtService.verifyAccessToken(pair.accessToken);
    expect(accessPayload.userId).toBe(testUser.id);
    expect(accessPayload.roles).toEqual(testUser.roles);
    expect(accessPayload.appAccess).toEqual(testUser.appAccess);
    expect(accessPayload.type).toBe('access');
  });

  it('rejects refresh token used as access token', () => {
    const pair = jwtService.issueTokens(testUser);

    expect(() => jwtService.verifyAccessToken(pair.refreshToken)).toThrow();
  });

  it('hashes tokens deterministically for storage', () => {
    const hash1 = jwtService.hashToken('test-token-value');
    const hash2 = jwtService.hashToken('test-token-value');
    const hash3 = jwtService.hashToken('different-token');

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(hash1).toHaveLength(64);
  });

  it('verifyRefreshToken returns refresh payload type', () => {
    const pair = jwtService.issueTokens(testUser);
    const payload: JwtPayload = jwtService.verifyRefreshToken(pair.refreshToken);
    expect(payload.type).toBe('refresh');
    expect(payload.sub).toBe(testUser.id);
  });
});
