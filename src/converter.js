import convert from 'convert-units';
import {
  map,
  head,
  last,
  reject,
  zipWith,
  equals,
} from 'ramda';

import { formatNumber } from 'humanize-plus';

export default ({ amount, unit }) => {
  const from = head(unit);
  const to = last(unit);
  const value = head(amount) || 1;

  if (!from) return null;

  const convertObj = convert(value).from(from);
  const convertTo = toUnit => convertObj.to(toUnit);
  const possibilities = reject(equals(from), convertObj.possibilities());
  const conversion = equals(from, to) ? convertObj.toBest({ exclude: [from] }) : convertTo(to);
  const formatOutput = (amt, unt) => ({
    amount: formatNumber(amt),
    unit: (amt === 1 ? convert().describe(unt).singluar : convert().describe(unt).plural).toLowerCase(),
  });

  return {
    orig: formatOutput(value, from),
    conversion: formatOutput(conversion.val || conversion, conversion.unit || to),
    possibleConversions: zipWith(
      formatOutput,
      map(convertTo, possibilities),
      possibilities,
    ),
  };
};

// TODO: Add color, timezones, currencies.
