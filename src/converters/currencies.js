import formatOutput from '../helpers/format-output';

export default (amount, from, to) => {
  const pairs = `${from},${to}`;
  fetch(`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${pairs}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
  .then(console.log);
  return {
    orig: formatOutput(amount, from),
    conversion: formatOutput(amount, to),
    possibleConversions: [],
    category: 'money',
  };
};
