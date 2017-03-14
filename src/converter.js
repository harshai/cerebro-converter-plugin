import convert from 'convert-units';
import {
  map,
  head,
  last,
  reject,
  zipWith,
  equals,
  reverse,
  compose,
} from 'ramda';

import formatNumber from 'humanize-number';

export default ({ amount, unit }) => {
  const from = head(unit);
  const to = last(unit);
  const value = head(amount) || 1;

  if (!from) return null;
  const convertObj = convert(value).from(from);
  const convertTo = toUnit => convertObj.to(toUnit);
  const possibilities = compose(
    reverse,
    reject(equals(from)),
    )(convertObj.possibilities());
  const conversion = equals(from, to) ? convertObj.toBest({ exclude: [from] }) : convertTo(to);
  const formatOutput = (amt, unt) => ({
    amount: formatNumber(+((+amt).toFixed(2)).toString()),
    unit: convert().describe(unt)[+amt === 1 ? 'singular' : 'plural'].toLowerCase(),
  });

  return {
    orig: formatOutput(value, from),
    conversion: formatOutput(conversion.val || conversion, conversion.unit || to),
    possibleConversions: zipWith(
      formatOutput,
      map(convertTo, possibilities),
      possibilities,
    ),
    category: convert().describe(from).measure,
  };
};

// TODO: Add color, timezones, currencies.
// TODO: Remove 0 values (try 1s)
// TODO: Support aliases
// TODO: Trim number of possibilities to 5-7
// TODO: Reimplement toBest(), taking the locale into consideration
// TODO: Refractor this file
