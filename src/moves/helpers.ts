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

  const newCol = colDiff ? changeCol(col, colDiff) : col;
  const newRow = rowDiff ? changeRow(row, rowDiff) : row;
  if (!newCol || !newRow) {
    return null;
  }

  const newLocation = `${newCol}${newRow}`;

  const pieceAtNew = board[newRow][newCol];
  if (pieceAtNew === '0') {
    if (captureOnly) {
      return null;
    }
    return { newLocation, captured: false };
  }
  const colorAtNew = pieceAtNew.charAt(1);
  if (colorAtNew === myColor) {
    return null;
  }

  return canCapture ? { newLocation, captured: true } : null;
}

/**
 *
 * @param row
 * @param diff - 0 - stay, positive - move up, negative - move down
 * @returns new row if valid, otherwise - null
 */
function changeRow(row: RowKey, diff: number): RowKey | null {
  const rowVal = Number(row);
  const newRowVal = rowVal + diff;
  if (newRowVal < 1 || newRowVal > 8) {
    return null;
  }
  return newRowVal.toString() as RowKey;
}

const LEFT_EDGE = 96;

/**
 *
 * @param col
 * @param diff - 0 - stay, positive - move right, negative - move left
 * @returns new col if valid, otherwise - null
 */
function changeCol(col: ColKey, diff: number): ColKey | null {
  const colVal = col.charCodeAt(0) - LEFT_EDGE;
  const newColVal = colVal + diff;
  if (newColVal < 1 || newColVal > 8) {
    return null;
  }
  return String.fromCharCode(newColVal + LEFT_EDGE) as ColKey;
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
    throw new UserError(`No cheating! Found not '${piece}' at ${from}.`);
  }
}
