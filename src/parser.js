import convert from 'convert-units';
import {
  replace,
  match,
  compose,
  sortBy,
  toLower,
  toUpper,
  reverse,
  join,
  take,
} from 'ramda';

import currencies from './helpers/constants';

const sortedUnits = compose(
  join('|'),
  reverse,
  sortBy,
)(toLower, convert().possibilities());

const UNITS = new RegExp(`${sortedUnits}`, 'g');
const CURRENCIES = new RegExp(`${currencies.join('|')}`, 'g');
const NUMBERS = /\d*\.?\d+/g;
const PREPOSITIONS = /\s(in|at|to)\s/i;
const COMMA = /,/g;

const removePrepositions = replace(PREPOSITIONS, '');
const removeUnits = replace(UNITS, '');
const removeCommas = replace(COMMA, '');
const matchUnits = match(UNITS);
const matchNumbers = match(NUMBERS);
const matchCurrencies = match(CURRENCIES);

const extractNumbers = compose(
  matchNumbers,
  removeCommas,
  removeUnits,
);
const extractUnits = compose(
  take(2), // ignore matches after the first two units
  matchUnits,
  removePrepositions,
);
const extractCurrencies = compose(
  take(2),
  matchCurrencies,
  removePrepositions,
  toUpper,
);

export default term => ({
  amount: extractNumbers(term),
  unit: extractUnits(term),
  currency: extractCurrencies(term),
});

// TODO: Add tests
// TODO: Add flowtype annotations
