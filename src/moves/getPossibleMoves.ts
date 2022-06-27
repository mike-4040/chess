import type { Piece } from '../games/types';
import { findGame } from '../games/dataStore';
import { generateMovesFunctions } from './moves';
import type { Move, GenerateMovesFunction } from './types';
import { UserError } from '../utils/error';
import { validateCurrentLocation } from './helpers';

export async function getPossibleMoves(
  uid: string,
  piece: Piece,
  from: string,
  gameId: string
): Promise<Move[]> {
  const game = await findGame(uid, gameId);

  if (!game) {
    throw new UserError(`Game '${gameId}' is not found.`);
  }

  const { board } = game;

  validateCurrentLocation(from, board, piece);

  if (!generateMovesFunctions.has(piece)) {
    throw new UserError(`Moves for ${piece} is not implemented yet.`);
  }

  const moveFunction = generateMovesFunctions.get(
    piece
  ) as GenerateMovesFunction;

  const moves = moveFunction(from, board).map(move => ({
    ...move,
    piece,
    from,
  }));

  return moves;
}
