import { Board, Piece } from '../games/types';

export interface MoveTo {
  newLocation: string;
  capture: boolean;
}

export interface Move extends MoveTo {
  piece: Piece;
  from: string;
  uid?: string;
  recordedAt?: Date;
  gameId?: string;
}

export type CompleteMove = Required<Move>;

export type GenerateMovesFunction = (
  location: string,
  board: Board
) => MoveTo[];
