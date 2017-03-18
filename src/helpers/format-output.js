import convert from 'convert-units';
import formatNumber from 'humanize-number';

export default (amt, unit) => ({
  amount: formatNumber(+((+amt).toFixed(2)).toString()),
  unit: unit || convert().describe(unit)[+amt === 1 ? 'singular' : 'plural'].toLowerCase(),
});
