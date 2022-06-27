import { Board, Piece } from '../games/types';

export interface MoveTo {
  newLocation: string;
  captured: boolean;
}

export interface Move extends MoveTo {
  piece: Piece,
  from: string,
}

export type generateMovesFunction = (
  location: string,
  board: Board
) => MoveTo[];
