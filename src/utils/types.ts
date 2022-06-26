import type { Request } from 'express';

export interface ChessRequest extends Request {
  uid: string;
}
