import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';
import { SendGiftDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
@UseGuards(GatewayAuthGuard)
export class WalletController {
  constructor(private readonly wallet: WalletService) {}

  @Get('balance')
  getBalance(@Req() req: Request & { userId?: string }) {
    return this.wallet.getBalance(req.userId!);
  }

  @Get('ledger')
  listLedger(
    @Req() req: Request & { userId?: string },
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.wallet.listLedger(req.userId!, limit ?? 20);
  }

  @Get('gifts/catalog')
  listGiftCatalog() {
    return this.wallet.listGiftCatalog();
  }

  @Post('gifts/send')
  sendGift(
    @Req() req: Request & { userId?: string },
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Body() dto: SendGiftDto,
  ) {
    if (!idempotencyKey?.trim()) {
      throw new BadRequestException({
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message: 'Idempotency-Key header is required',
      });
    }
    return this.wallet.sendGift(req.userId!, idempotencyKey.trim(), dto);
  }
}
