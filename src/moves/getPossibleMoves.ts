import type { ColKey, Piece, RowKey } from '../games/types';
import { findGame } from '../games/dataStore';
import { generateMovesFunctions } from './moves';
import type { Move, generateMovesFunction } from './types';
import { UserError } from '../utils/error';

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

  const [col, row] = from.split('') as [ColKey, RowKey];

  if (!(row in board)) {
    throw new UserError(`Wrong Row '${row}'.`);
  }

  if (!(col in board[row])) {
    throw new UserError(`Wrong Column '${col}'.`);
  }

  const pieceAtFrom = board[row][col];

  if (piece !== pieceAtFrom) {
    throw new UserError(
      `No cheating! Found not '${piece}' but '${pieceAtFrom}' at ${from}.`
    );
  }

  if (!generateMovesFunctions.has(piece)) {
    throw new UserError(`Moves for ${piece} is not implemented yet.`);
  }

  const moveFunction = generateMovesFunctions.get(
    piece
  ) as generateMovesFunction;

  const moves = moveFunction(from, board).map(move => ({
    ...move,
    piece,
    from,
  }));

  return moves;
}
