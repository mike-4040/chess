import type { ObjectId } from 'mongodb';

export type Piece =
  | 'kw'
  | 'kb'
  | 'qw'
  | 'qb'
  | 'bw'
  | 'bb'
  | 'kw'
  | 'kb'
  | 'rw'
  | 'rb'
  | 'pw'
  | 'pb'
  | '0';

export interface Row {
  a: Piece;
  b: Piece;
  c: Piece;
  d: Piece;
  e: Piece;
  f: Piece;
  g: Piece;
  h: Piece;
}

export interface Board {
  '1': Row;
  '2': Row;
  '3': Row;
  '4': Row;
  '5': Row;
  '6': Row;
  '7': Row;
  '8': Row;
}

export type ColKey = keyof Row;
export type RowKey = keyof Board;

type Side = 'w' | 'b';

export interface Game {
  _id: ObjectId;
  board: Board;
  ended: boolean;
  uid: string;
  nextSide: Side
}
