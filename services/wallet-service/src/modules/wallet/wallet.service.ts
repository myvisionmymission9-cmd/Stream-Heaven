import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SendGiftDto } from './dto/wallet.dto';

const GIFT_CATALOG = [
  { giftId: '00000000-0000-4000-8000-000000000001', slug: 'rose', displayName: 'Rose', coinCostMinor: 100, animationTier: 'basic' },
  { giftId: '00000000-0000-4000-8000-000000000002', slug: 'fire', displayName: 'Fire', coinCostMinor: 500, animationTier: 'basic' },
  { giftId: '00000000-0000-4000-8000-000000000003', slug: 'diamond', displayName: 'Diamond', coinCostMinor: 1000, animationTier: 'premium' },
  { giftId: '00000000-0000-4000-8000-000000000004', slug: 'lion', displayName: 'Lion', coinCostMinor: 5000, animationTier: 'legendary' },
  { giftId: '00000000-0000-4000-8000-000000000005', slug: 'crown', displayName: 'Crown', coinCostMinor: 10000, animationTier: 'legendary' },
  { giftId: '00000000-0000-4000-8000-000000000006', slug: 'rocket', displayName: 'Rocket', coinCostMinor: 25000, animationTier: 'legendary' },
] as const;

@Injectable()
export class WalletService {
  private readonly idempotentGifts = new Map<string, Record<string, unknown>>();
  private readonly balances = new Map<string, { coinBalanceMinor: number; earningsBalanceMinor: number }>();

  getBalance(userId: string) {
    const balance = this.balances.get(userId) ?? { coinBalanceMinor: 10000, earningsBalanceMinor: 0 };
    this.balances.set(userId, balance);
    return {
      userId,
      coinBalanceMinor: balance.coinBalanceMinor,
      earningsBalanceMinor: balance.earningsBalanceMinor,
      currency: 'INR',
      updatedAt: new Date().toISOString(),
    };
  }

  listLedger(userId: string, limit = 20) {
    const capped = Math.max(1, Math.min(limit, 50));
    return {
      items: [
        {
          entryId: randomUUID(),
          type: 'PURCHASE',
          amountMinor: 10000,
          direction: 'CREDIT',
          referenceId: 'dev-stub-welcome-bonus',
          createdAt: new Date().toISOString(),
        },
      ],
      pagination: { nextCursor: null, hasMore: false, limit: capped },
    };
  }

  listGiftCatalog() {
    return { items: [...GIFT_CATALOG] };
  }

  sendGift(senderUserId: string, idempotencyKey: string, dto: SendGiftDto) {
    const cached = this.idempotentGifts.get(idempotencyKey);
    if (cached) {
      return cached;
    }

    const gift = GIFT_CATALOG.find((item) => item.giftId === dto.giftId);
    if (!gift) {
      throw new NotFoundException({
        code: 'GIFT_NOT_FOUND',
        message: 'Gift not found in catalog',
      });
    }

    const quantity = dto.quantity ?? 1;
    const coinDebitedMinor = gift.coinCostMinor * quantity;
    const balance = this.balances.get(senderUserId) ?? { coinBalanceMinor: 10000, earningsBalanceMinor: 0 };

    if (balance.coinBalanceMinor < coinDebitedMinor) {
      throw new HttpException(
        { code: 'INSUFFICIENT_BALANCE', message: 'Insufficient coin balance' },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    balance.coinBalanceMinor -= coinDebitedMinor;
    this.balances.set(senderUserId, balance);

    const receipt = {
      receiptId: randomUUID(),
      giftId: dto.giftId,
      senderUserId,
      recipientUserId: dto.recipientUserId,
      coinDebitedMinor,
      ledgerEntryId: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.idempotentGifts.set(idempotencyKey, receipt);
    return receipt;
  }
}
