import convert from 'convert-units';
import {
  map,
  reject,
  zipWith,
  equals,
  reverse,
  compose,
} from 'ramda';
import formatOutput from '../helpers/format-output';

export default (amount, from, to) => {
  const convertObj = convert(amount).from(from);
  const convertTo = toUnit => convertObj.to(toUnit);
  const possibilities = compose(
    reverse,
    reject(equals(from)),
    )(convertObj.possibilities());
  const conversion = equals(from, to) ? convertObj.toBest({ exclude: [from] }) : convertTo(to);

  return {
    orig: formatOutput(amount, from),
    conversion: formatOutput(conversion.val || conversion, conversion.unit || to),
    possibleConversions: zipWith(
      formatOutput,
      map(convertTo, possibilities),
      possibilities,
    ),
    category: convert().describe(from).measure,
  };
};


// TODO: Remove 0 values (try 1s)
// TODO: Support aliases
// TODO: Trim number of possibilities to 5-7
// TODO: Reimplement toBest(), taking the locale into consideration
// TODO: Refractor this file
