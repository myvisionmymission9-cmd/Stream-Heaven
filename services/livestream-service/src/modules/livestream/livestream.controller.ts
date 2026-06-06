import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GatewayAuthGuard } from '../../common/guards/gateway-auth.guard';
import { CreateRoomDto, TokenRequestDto } from './dto/livestream.dto';
import { LivestreamService } from './livestream.service';

@Controller('livestream')
@UseGuards(GatewayAuthGuard)
export class LivestreamController {
  constructor(private readonly livestream: LivestreamService) {}

  @Post('rooms')
  createRoom(@Req() req: Request & { userId?: string }, @Body() dto: CreateRoomDto) {
    return this.livestream.createRoom(req.userId!, dto);
  }

  @Get('rooms')
  listRooms(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.livestream.listActiveRooms(limit ?? 20);
  }

  @Post('rooms/:roomId/start')
  startRoom(@Req() req: Request & { userId?: string }, @Param('roomId') roomId: string) {
    return this.livestream.startRoom(roomId, req.userId!);
  }

  @Post('rooms/:roomId/join')
  joinRoom(@Param('roomId') roomId: string) {
    return this.livestream.joinRoom(roomId);
  }

  @Post('rooms/:roomId/leave')
  leaveRoom(@Param('roomId') roomId: string) {
    return this.livestream.leaveRoom(roomId);
  }

  @Post('rooms/:roomId/end')
  endRoom(@Param('roomId') roomId: string) {
    return this.livestream.endRoom(roomId);
  }

  @Get('rooms/:roomId/viewer-count')
  viewerCount(@Param('roomId') roomId: string) {
    return this.livestream.viewerCount(roomId);
  }

  @Post('rooms/:roomId/token')
  mintToken(@Param('roomId') roomId: string, @Body() dto: TokenRequestDto) {
    return this.livestream.mintToken(roomId, dto.role);
  }
}
