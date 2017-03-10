import convert from 'convert-units';
import {
  replace,
  match,
  compose,
  sortBy,
  toLower,
  reverse,
  join,
} from 'ramda';

const sortedUnits = compose(
  join('|'),
  reverse,
  sortBy,
)(toLower, convert().possibilities());

const UNITS = new RegExp(`${sortedUnits}`, 'g');
const NUMBERS = /\d*\.?\d+/g;
const PREPOSITIONS = /\s(in|at|to)\s/i;
const COMMA = /,/g;

const removePrepositions = replace(PREPOSITIONS, '');
const removeUnits = replace(UNITS, '');
const removeCommas = replace(COMMA, '');
const matchUnits = match(UNITS);
const matchNumbers = match(NUMBERS);

const extractNumbers = compose(
  matchNumbers,
  removeCommas,
  removeUnits,
);
const extractUnits = compose(
  matchUnits,
  removePrepositions,
);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
});
