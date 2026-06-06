import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export interface FirebaseUserInfo {
  uid: string;
  phone?: string;
  email?: string;
}

@Injectable()
export class FirebaseVerifierService {
  private readonly logger = new Logger(FirebaseVerifierService.name);
  private initialized = false;

  constructor(private readonly config: ConfigService) {
    this.init();
  }

  private init(): void {
    const projectId = this.config.get<string>('app.firebaseProjectId');
    const clientEmail = this.config.get<string>('app.firebaseClientEmail');
    const privateKey = this.config.get<string>('app.firebasePrivateKey');

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });
      this.initialized = true;
      this.logger.log('Firebase Admin SDK initialized');
    } else {
      this.logger.warn('Firebase credentials missing — using dev mock verifier');
    }
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

    // Dev mock: accept tokens prefixed with "dev:"
    if (idToken.startsWith('dev:')) {
      const uid = idToken.slice(4);
      return { uid, phone: undefined };
    }

    throw new Error('Invalid Firebase token');
  }
}
