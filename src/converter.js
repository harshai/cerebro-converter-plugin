import {
  head,
  last,
} from 'ramda';

import convertUnits from './converters/units';
import convertCurrencies from './converters/currencies';

export default ({ amount, unit, currency }) => {
  const from = head(currency) || head(unit);
  const to = last(currency) || last(unit);
  const value = head(amount) || 1;

  if (currency.length) {
    return convertCurrencies(value, from, to);
  }

  if (unit.length) {
    return convertUnits(value, from, to);
  }

  return null;
};

// TODO: Add color, timezones
