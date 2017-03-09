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

const unitsWithNumbers = [
  'yd3',
  'yd2',
  'mm3',
  'mm2',
  'mi2',
  'm3',
  'm2',
  'km3',
  'km2',
  'in2',
  'ft3',
  'ft2',
  'cm3',
  'cm2',
];

const sortedUnits = compose(
  join('|'),
  reverse,
  sortBy,
)(toLower, convert().possibilities());

const UNITS_WITH_NUMBERS = new RegExp(`${unitsWithNumbers}`, 'gi');
const UNITS = new RegExp(`${sortedUnits}`, 'gi');
const NUMBERS = new RegExp('\\d*\\.?\\d', 'gi');
const PREPOSITIONS = new RegExp('\\s(in|at|to)\\s', 'i');

const removePrepositions = replace(PREPOSITIONS, '');
const matchUnits = match(UNITS);
const extractNumbers = match(NUMBERS);
const extractUnits = compose(
  matchUnits,
  removePrepositions,
);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
});
