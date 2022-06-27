import type { Piece } from '../games/types';
import { findGame, updateGame } from '../games/dataStore';
import { generateMovesFunctions } from './moves';
import type { GenerateMovesFunction, CompleteMove } from './types';
import { UserError } from '../utils/error';
import { insertMove } from './dataStore';
import { updateBoard } from '../games/helpers';
import { validateCurrentLocation } from './helpers';

export async function postMove(
  uid: string,
  piece: Piece,
  from: string,
  to: string,
  gameId: string
): Promise<string> {
  const game = await findGame(uid, gameId);

  if (!game) {
    throw new UserError(`Game '${gameId}' is not found.`);
  }

  const { board } = game;

  validateCurrentLocation(from, board, piece);

  // Don't like this implementation: generating valid moves[] and checking if it includes current move
  // Better create validator
  if (!generateMovesFunctions.has(piece)) {
    throw new UserError(`Moves for '${piece}' is not implemented yet.`);
  }

  const generateMovesFunction = generateMovesFunctions.get(
    piece
  ) as GenerateMovesFunction;

  const validMoves = generateMovesFunction(from, board);

  const moveTo = validMoves.find(({ newLocation }) => newLocation === to);

  if (!moveTo) {
    throw new UserError('Invalid move');
  }

  const move: CompleteMove = {
    ...moveTo,
    from,
    piece,
    uid,
    gameId,
    recordedAt: new Date(),
  };

  const moveId = await insertMove(move);

  updateBoard(board, piece, from, to);

  await updateGame(game._id, { $set: { board } });

  return moveId;
}
