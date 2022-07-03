import type { Board, ColKey, Piece, RowKey } from '../games/types';
import { UserError } from '../utils/error';
import type { MoveTo } from './types';
/**
 *
 * @param from
 * @param colDiff - 0 - stay, positive - move right, negative - move left
 * @param rowDiff - 0 - stay, positive - move up,    negative - move down
 * @param board
 * @param myColor
 * @param captureOnly - valid only if capture
 * @param canCapture  -
 * @returns
 */
export function tryMove(
  from: string,
  colDiff: number,
  rowDiff: number,
  board: Board,
  myColor: string,
  captureOnly: boolean,
  canCapture: boolean
): MoveTo | null {
  const [col, row] = from.split('') as [ColKey, RowKey];

  const newCol = changeCol(col, colDiff);
  const newRow = changeRow(row, rowDiff);
  // if either of newCol or nowRow is null then the move is invalid
  if (!newCol || !newRow) {
    return null;
  }
  const newLocation = `${newCol}${newRow}`;

  const isPathClear = verifyPathIsClear(col, colDiff, row, rowDiff, board);

  if (!isPathClear) {
    return null;
  }

  const pieceAtNew = board[newRow][newCol];

  // if new location is empty
  if (pieceAtNew === '0') {
    if (captureOnly) {
      return null;
    }
    return { newLocation, capture: false };
  }
  const colorAtNew = pieceAtNew.charAt(1);
  if (colorAtNew === myColor) {
    return null;
  }

  return canCapture ? { newLocation, capture: true } : null;
}

/**
 * Diff: 0 - stay, positive - move up, negative - move down
 * @returns valid new col or null
 */
function changeRow(row: RowKey, diff: number): RowKey | null {
  if (!diff) {
    return row;
  }

  const rowVal = Number(row);
  const newRowVal = rowVal + diff;
  if (newRowVal < 1 || newRowVal > 8) {
    return null;
  }

  return newRowVal.toString() as RowKey;
}

const LEFT_EDGE = 96;

/**
 * Diff: 0 - stay, positive - move right, negative - move left
 * @returns valid new col or null
 */
function changeCol(col: ColKey, diff: number): ColKey | null {
  if (!diff) {
    return col;
  }

  const colVal = col.charCodeAt(0) - LEFT_EDGE;
  const newColVal = colVal + diff;
  if (newColVal < 1 || newColVal > 8) {
    return null;
  }

  return String.fromCharCode(newColVal + LEFT_EDGE) as ColKey;
}

/**
 * Check if the whole path from current location to new location is clear
 * No pieces but Knight can jump over piece on the way.
 * Knight's move is not diagonal, will pass.
 * Assumes that the move is withing the board, should be checked before
 */
function verifyPathIsClear(
  col: ColKey,
  colDiff: number,
  row: RowKey,
  rowDiff: number,
  board: Board
): boolean {
  const absCol = Math.abs(colDiff);
  const absRow = Math.abs(rowDiff);

  // The move is not
  // horizontal - vertical -- diagonal
  if (!(!colDiff || !rowDiff || absCol !== absRow)) {
    // nothing to check
    return true;
  }

  // move to adjacent location, nothing to check
  if (absCol < 2 && absRow < 2) {
    return true;
  }

  const colStep = colDiff ? colDiff / absCol : 0;
  const rowStep = rowDiff ? rowDiff / absRow : 0;

  // Not checking final location, only intermediate
  for (let i = 1; i < Math.max(absCol, absRow); i++) {
    const nextCol = changeCol(col, colStep * i) as ColKey;
    const nextRow = changeRow(row, rowStep * i) as RowKey;
    if (board[nextRow][nextCol] !== '0') {
      return false;
    }
  }

  return true;
}

export function validateCurrentLocation(
  from: string,
  board: Board,
  piece: Piece
): void {
  const [col, row] = from.split('') as [ColKey, RowKey];

  if (!(row in board)) {
    throw new UserError(`Wrong Row '${row}' in 'from'.`);
  }

  if (!(col in board[row])) {
    throw new UserError(`Wrong Column '${col} in 'from'.`);
  }

  const pieceAtFrom = board[row][col];

  if (piece !== pieceAtFrom) {
    throw new UserError(`No cheating! Not found '${piece}' at ${from}.`);
  }
}
