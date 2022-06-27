import type { Board, ColKey, RowKey } from '../games/types';
import type { MoveTo } from './types';

export function tryMove(
  location: string,
  colDiff: number,
  rowDiff: number,
  board: Board,
  myColor: string,
  captureOnly: boolean
): MoveTo | null {
  const [col, row] = location.split('') as [ColKey, RowKey];

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
  return { newLocation, captured: true };
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
 * @param colKey 
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
