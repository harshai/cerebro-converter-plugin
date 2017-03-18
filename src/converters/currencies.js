import formatOutput from '../helpers/format-output';

export default (amount, from, to) => {
  console.log(amount, from, to);
  return {
    orig: formatOutput(amount, from),
    conversion: formatOutput(amount, to),
    possibleConversions: [],
    category: 'money',
  };
};
