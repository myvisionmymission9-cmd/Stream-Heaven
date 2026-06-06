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
import { SocialService } from './social.service';
import {
  BlockDto,
  CreateCommentDto,
  CreatePostDto,
  ReportDto,
} from './dto/social.dto';

@Controller('social')
@UseGuards(GatewayAuthGuard)
export class SocialController {
  constructor(private readonly social: SocialService) {}

  @Post('posts')
  createPost(@Req() req: Request & { userId?: string }, @Body() dto: CreatePostDto) {
    return this.social.createPost(req.userId!, dto);
  }

  @Get('feed')
  getFeed(
    @Req() req: Request & { userId?: string },
    @Query('cursor') cursor?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.social.getFeed(req.userId!, cursor, limit ?? 20);
  }

  @Post('posts/:postId/comments')
  createComment(
    @Req() req: Request & { userId?: string },
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.social.createComment(req.userId!, postId, dto);
  }

  @Post('users/:targetUserId/follow')
  followUser(@Param('targetUserId') targetUserId: string) {
    return this.social.followUser(targetUserId);
  }

  @Post('reports')
  reportContent(@Req() req: Request & { userId?: string }, @Body() dto: ReportDto) {
    return this.social.reportContent(req.userId!, dto);
  }

  @Post('blocks')
  blockUser(@Req() req: Request & { userId?: string }, @Body() dto: BlockDto) {
    return this.social.blockUser(req.userId!, dto);
  }
}
