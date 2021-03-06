import type { Piece } from '../games/types';
import { findGame, updateGame } from '../games/dataStore';
import { generateMovesFunctions } from './moves';
import type { GenerateMovesFunction, CompleteMove } from './types';
import { UserError } from '../utils/error';
import { insertMove } from './dataStore';
import { movePieceOnBoard } from '../games/helpers';
import { validateCurrentLocation } from './helpers';

export async function createMove(
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

  const { board, nextSide } = game;

  const movingSide = piece.charAt(1);

  if (movingSide !== nextSide) {
    throw new UserError('Not your turn!');
  }

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

  /** @todo add transaction */
  const moveId = await insertMove(move);

  movePieceOnBoard(board, piece, from, to);

  const newNextSide = nextSide === 'w' ? 'b' : 'w';

  await updateGame(game._id, { $set: { board, nextSide: newNextSide } });

  return moveId;
}
