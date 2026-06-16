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
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/community.dto';

@Controller('communities')
@UseGuards(GatewayAuthGuard)
export class CommunityController {
  constructor(private readonly community: CommunityService) {}

  @Get()
  listCommunities(
    @Query('q') q?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.community.listCommunities(q, limit ?? 20);
  }

  @Post()
  createCommunity(
    @Req() req: Request & { userId?: string },
    @Body() dto: CreateCommunityDto,
  ) {
    return this.community.createCommunity(req.userId!, dto);
  }

  @Get(':communityId')
  getCommunity(@Param('communityId') communityId: string) {
    return this.community.getCommunity(communityId);
  }

  @Post(':communityId/join')
  joinCommunity(
    @Req() req: Request & { userId?: string },
    @Param('communityId') communityId: string,
  ) {
    return this.community.joinCommunity(communityId, req.userId!);
  }
}
