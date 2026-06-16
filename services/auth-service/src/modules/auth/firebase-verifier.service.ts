import { createPublicKey, verify } from 'crypto';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export interface FirebaseUserInfo {
  uid: string;
  phone?: string;
  email?: string;
}

const FIREBASE_JWKS_URL =
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

let cachedJwks: { keys: JsonWebKey[]; fetchedAt: number } | null = null;
const JWKS_TTL_MS = 60 * 60 * 1000;

@Injectable()
export class FirebaseVerifierService {
  private readonly logger = new Logger(FirebaseVerifierService.name);
  private initialized = false;
  private readonly projectId: string | undefined;

  constructor(private readonly config: ConfigService) {
    this.projectId = this.config.get<string>('app.firebaseProjectId');
    this.init();
  }

  private init(): void {
    const clientEmail = this.config.get<string>('app.firebaseClientEmail');
    const privateKey = this.config.get<string>('app.firebasePrivateKey');

    if (this.projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.projectId,
          clientEmail,
          privateKey,
        }),
      });
      this.initialized = true;
      this.logger.log('Firebase Admin SDK initialized');
      return;
    }

    if (this.projectId) {
      this.logger.warn(
        'Firebase Admin credentials missing — verifying ID tokens via Google JWKS (dev)',
      );
      return;
    }

    this.logger.warn('Firebase project ID missing — using dev mock verifier only');
  }

  async verifyIdToken(idToken: string): Promise<FirebaseUserInfo> {
    if (this.initialized) {
      const decoded = await admin.auth().verifyIdToken(idToken);
      return {
        uid: decoded.uid,
        phone: decoded.phone_number,
        email: decoded.email,
      };
    }

    if (idToken.startsWith('dev:')) {
      const uid = idToken.slice(4);
      return { uid, phone: undefined };
    }

    if (this.projectId) {
      return verifyFirebaseIdTokenWithJwks(idToken, this.projectId);
    }

    throw new Error('Invalid Firebase token');
  }
}

async function getJwksKeys(): Promise<JsonWebKey[]> {
  const now = Date.now();
  if (cachedJwks && now - cachedJwks.fetchedAt < JWKS_TTL_MS) {
    return cachedJwks.keys;
  }

  const response = await fetch(FIREBASE_JWKS_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch Firebase JWKS');
  }

  const body = (await response.json()) as { keys: JsonWebKey[] };
  cachedJwks = { keys: body.keys, fetchedAt: now };
  return body.keys;
}

function decodeJwtPart(part: string): Record<string, unknown> {
  const padded = part.replace(/-/g, '+').replace(/_/g, '/');
  const json = Buffer.from(padded, 'base64').toString('utf8');
  return JSON.parse(json) as Record<string, unknown>;
}

async function verifyFirebaseIdTokenWithJwks(
  idToken: string,
  projectId: string,
): Promise<FirebaseUserInfo> {
  const [headerPart, payloadPart, signaturePart] = idToken.split('.');
  if (!headerPart || !payloadPart || !signaturePart) {
    throw new Error('Invalid Firebase token');
  }

  const header = decodeJwtPart(headerPart);
  const payload = decodeJwtPart(payloadPart);
  const kid = header.kid as string | undefined;
  if (!kid) {
    throw new Error('Invalid Firebase token');
  }

  const keys = await getJwksKeys();
  const jwk = keys.find((key) => (key as { kid?: string }).kid === kid);
  if (!jwk) {
    throw new Error('Invalid Firebase token');
  }

  const signingInput = `${headerPart}.${payloadPart}`;
  const signature = Buffer.from(
    signaturePart.replace(/-/g, '+').replace(/_/g, '/'),
    'base64',
  );
  const publicKey = createPublicKey({ key: jwk, format: 'jwk' });
  const valid = verify('RSA-SHA256', Buffer.from(signingInput), publicKey, signature);
  if (!valid) {
    throw new Error('Invalid Firebase token');
  }

  const iss = payload.iss as string | undefined;
  const aud = payload.aud as string | undefined;
  const exp = payload.exp as number | undefined;
  const sub = payload.sub as string | undefined;

  if (iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error('Invalid Firebase token');
  }
  if (aud !== projectId) {
    throw new Error('Invalid Firebase token');
  }
  if (!exp || exp * 1000 < Date.now()) {
    throw new Error('Invalid Firebase token');
  }
  if (!sub) {
    throw new Error('Invalid Firebase token');
  }

  return {
    uid: sub,
    phone: payload.phone_number as string | undefined,
    email: payload.email as string | undefined,
  };
}
