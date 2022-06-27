import type { Board, Piece } from '../games/types';
import type { MoveTo, generateMovesFunction } from './types';
import { tryMove } from './helpers';

export function pawnWhiteMoves(location: string, board: Board): MoveTo[] {
  const moves = [];
  const row = location.charAt(1);

  const move1 = tryMove(location, 0, 1, board, 'w', false);
  if (move1) {
    moves.push(move1);
  }

  if (row === '2') {
    const move2 = tryMove(location, 0, 2, board, 'w', false);
    if (move2) {
      moves.push(move2);
    }
  }

  const move3 = tryMove(location, -1, 1, board, 'w', true);
  if (move3) {
    moves.push(move3);
  }

  const move4 = tryMove(location, 1, 1, board, 'w', true);
  if (move4) {
    moves.push(move4);
  }

  return moves;
}

export function pawnBlackMoves(location: string, board: Board): MoveTo[] {
  const moves = [];
  const row = location.charAt(1);

  const move1 = tryMove(location, 0, -1, board, 'b', false);
  if (move1) {
    moves.push(move1);
  }

  if (row === '7') {
    const move2 = tryMove(location, 0, -2, board, 'b', false);
    if (move2) {
      moves.push(move2);
    }
  }

  const move3 = tryMove(location, -1, -1, board, 'b', true);
  if (move3) {
    moves.push(move3);
  }

  const move4 = tryMove(location, 1, -1, board, 'b', true);
  if (move4) {
    moves.push(move4);
  }

  return moves;
}

export const generateMovesFunctions = new Map<Piece, generateMovesFunction>([
  ['pw', pawnWhiteMoves],
  ['pb', pawnBlackMoves],
]);
