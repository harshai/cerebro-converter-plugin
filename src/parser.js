import convert from 'convert-units';
import {
  replace,
  match,
  compose,
  curry,
  sortBy,
  toLower,
  reverse,
  join,
} from 'ramda';

const trace = curry(function(tag, x) {
  console.log(tag, x, '<<<<>>>>');
  return x;
});

const sortedPossibilities = compose(
  join('|'),
  reverse,
  sortBy,
)(toLower, convert().possibilities());

const UNITS = new RegExp(`\\b(${sortedPossibilities})\\b`, 'gi');
const NUMBERS = new RegExp('\\d*\\.?\\d', 'gi');
const PREPOSITIONS = new RegExp('\\s(in|at|to)\\s', 'i');

const removeNumbers = replace(NUMBERS, '');
const removePrepositions = replace(PREPOSITIONS, '');
const matchUnits = match(UNITS);
const extractNumbers = match(NUMBERS);
const extractUnits = compose(
  trace('removePreposition'),
  matchUnits,
  removeNumbers,
  removePrepositions,
);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
});
