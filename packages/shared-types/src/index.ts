/**
 * Placeholder types aligned with packages/shared-contracts.
 * Replace with OpenAPI codegen output in CI (`pnpm contracts:generate`).
 */

export type AppId = 'social' | 'livestream' | 'astro' | 'media';

export type Role = 'USER' | 'CREATOR' | 'MODERATOR' | 'ADMIN';

export interface ErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  path: string;
  requestId: string;
}

export interface TokenPairResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
  user: AuthUserSummary;
}

export interface AuthUserSummary {
  userId: string;
  roles: Role[];
  appAccess: AppId[];
  isNewUser?: boolean;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  handle?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  locale: string;
  apps: AppId[];
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  handle?: string;
  bio?: string;
  locale?: string;
  avatarUrl?: string;
}
