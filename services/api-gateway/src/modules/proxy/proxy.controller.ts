import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

/** Fallback controller for unmatched gateway routes */
@Controller()
export class ProxyController {
  @All('*')
  notFound(@Req() req: Request, @Res() res: Response) {
    res.status(404).json({
      statusCode: 404,
      code: 'ROUTE_NOT_FOUND',
      message: `No gateway route for ${req.path}`,
      timestamp: new Date().toISOString(),
      path: req.path,
      requestId: req.headers['x-request-id'],
    });
  }
}
