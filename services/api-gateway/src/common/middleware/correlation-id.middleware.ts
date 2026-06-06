import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function CorrelationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId =
    (req.headers['x-correlation-id'] as string) ??
    (req as Request & { requestId?: string }).requestId ??
    uuidv4();
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('X-Correlation-Id', correlationId);
  next();
}
