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
import tracer from './helpers/tracer';

const unitsWithNumbers = [
  'mm2',
  'cm2',
  'm2',
  'km2',
  'in2',
  'yd2',
  'ft2',
  'mi2',
  'mm3',
  'cm3',
  'm3',
  'km3',
  'ft3',
  'yd3',
];

const sortedPossibilities = compose(
  join('|'),
  reverse,
  sortBy,
)(toLower, convert().possibilities());

const UNITS = new RegExp(`\\b(${sortedPossibilities})\\b`, 'gi');
const NUMBERS = new RegExp('\\d*\\.?\\d', 'gi');
const PREPOSITIONS = new RegExp('\\s(in|at|to)\\s', 'i');

// If removeNumbers receives a string one of unitsWithNumbers, <do something smart>, else proceed as it is. Or update regex to incorporate it.
const removeNumbers = replace(NUMBERS, '');
const removePrepositions = replace(PREPOSITIONS, '');
const matchUnits = match(UNITS);
const extractNumbers = match(NUMBERS);
const extractUnits = compose(
  matchUnits,
  removeNumbers,
  removePrepositions,
  tracer('matchUnits'),
);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
});
