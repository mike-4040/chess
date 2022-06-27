import { Board, Game, Row } from './types';

const emptyRow: Row = {
  a: '0',
  b: '0',
  c: '0',
  d: '0',
  e: '0',
  f: '0',
  g: '0',
  h: '0',
};

const initialBoard: Board = {
  '1': {
    a: 'rw',
    b: 'kw',
    c: 'bw',
    d: 'kw',
    e: 'qw',
    f: 'bw',
    g: 'kw',
    h: 'rw',
  },
  '2': {
    a: 'pw',
    b: 'pw',
    c: 'pw',
    d: 'pw',
    e: 'pw',
    f: 'pw',
    g: 'pw',
    h: 'pw',
  },
  '3': emptyRow,
  '4': emptyRow,
  '5': emptyRow,
  '6': emptyRow,
  '7': {
    a: 'pb',
    b: 'pb',
    c: 'pb',
    d: 'pb',
    e: 'pb',
    f: 'pb',
    g: 'pb',
    h: 'pb',
  },
  '8': {
    a: 'rb',
    b: 'kb',
    c: 'bb',
    d: 'qb',
    e: 'kb',
    f: 'bb',
    g: 'kb',
    h: 'rb',
  },
};

export const initialGame: Omit<Game, '_id' | 'uid'> = {
  ended: false,
  board: initialBoard,
};
