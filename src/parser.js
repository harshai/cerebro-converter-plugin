import convert from 'convert-units';
import {
  replace,
  match,
  compose,
} from 'ramda';

const UNITS = new RegExp(`\\b(${convert().possibilities().join('|')})\\b`, 'gi');
const NUMBERS = new RegExp('\\d*\\.?\\d', 'gi');
const PREPOSITIONS = new RegExp('\\s(in|at|to)', 'i');

const removeNumbers = replace(NUMBERS, '');
const removePrepositions = replace(PREPOSITIONS, '');
const matchUnits = match(UNITS);
const extractNumbers = match(NUMBERS);
const extractUnits = compose(matchUnits, removeNumbers, removePrepositions);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
});
