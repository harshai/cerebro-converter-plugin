import convert from 'convert-units';
import formatNumber from 'humanize-number';

export default (conversionType) => {
  if (conversionType === 'unit') {
    return (amt, unit) => ({
      amount: formatNumber(+((+amt).toFixed(2)).toString()),
      unit: convert().describe(unit)[+amt === 1 ? 'singular' : 'plural'].toLowerCase(),
    });
  }

  if (conversionType === 'currency') {
    return (amt, unit) => ({
      amount: formatNumber(+((+amt).toFixed(2)).toString()),
      unit,
    });
  }

  return (amt, unit) => ({ amt, unit });
};

// TODO: Add tests
// TODO: Add flowtype annotations
