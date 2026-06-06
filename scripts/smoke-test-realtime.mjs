#!/usr/bin/env node
/**
 * Phase 1 realtime smoke: JWT from gateway → Socket.IO /presence → client.ping → server.pong
 */
import { io } from 'socket.io-client';

const gatewayBase = process.env.GATEWAY_BASE ?? 'http://localhost:3000';
const realtimeBase = process.env.REALTIME_BASE ?? 'http://localhost:3009';
const phone =
  process.env.PHONE ??
  `+9199${String(Math.floor(10000000 + Math.random() * 89999999))}`;
const appId = process.env.APP_ID ?? 'social';

async function jsonPost(path, body) {
  const res = await fetch(`${gatewayBase}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-App-Id': appId },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${path} ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function getAccessToken() {
  const send = await jsonPost('/v1/auth/otp/send', { phone });
  const code = send.mockOtpCode;
  if (!code) {
    throw new Error('mockOtpCode missing — use SMS_PROVIDER=mock and NODE_ENV=development');
  }
  const session = await jsonPost('/v1/auth/otp/verify', {
    phone,
    code,
    requestId: send.requestId,
  });
  if (!session.accessToken) {
    throw new Error('No accessToken in verify response');
  }
  return session.accessToken;
}

function emitPing(socket, ts, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timed out waiting for ping ack')), timeoutMs);
    socket.emit('client.ping', { ts }, (payload) => {
      clearTimeout(timer);
      if (!payload) {
        reject(new Error('Empty ack from client.ping'));
        return;
      }
      resolve(payload);
    });
  });
}

async function main() {
  console.log('Realtime smoke: fetching JWT via gateway...');
  const token = await getAccessToken();
  console.log('JWT obtained');

  const socket = io(`${realtimeBase}/presence`, {
    path: '/socket.io',
    transports: ['websocket'],
    auth: { token },
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Socket connect timeout')), 10000);
    socket.on('connect', () => {
      clearTimeout(timer);
      resolve();
    });
    socket.on('connect_error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });

  console.log('Socket connected');
  const ts = Date.now();
  const pong = await emitPing(socket, ts);
  if (pong.eventType !== 'server.pong') {
    throw new Error(`Unexpected ack: ${JSON.stringify(pong)}`);
  }
  console.log('server.pong:', JSON.stringify(pong));
  socket.close();
  console.log('Realtime smoke passed (JWT → Socket.IO → pong).');
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
