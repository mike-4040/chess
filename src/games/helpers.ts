import type { Board, ColKey, Piece, RowKey } from './types';

// DANGER! no validation here
// DANGER! mutating board
export function movePieceOnBoard(
  board: Board,
  piece: Piece,
  from: string,
  to: string
): void {
  const [fromCol, fromRow] = from.split('') as [ColKey, RowKey];
  const [toCol, toRow] = to.split('') as [ColKey, RowKey];

  board[fromRow][fromCol] = '0';
  board[toRow][toCol] = piece;
}
