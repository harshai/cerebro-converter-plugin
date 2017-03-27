import formatOutput from '../helpers/format-output';
// import conversions from '../helpers/conversions';
import supportedCurrencies from '../helpers/constants';

function fetchConversionRates(curencyList) {
  console.log(curencyList);
  return fetch(`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${curencyList.join(',')}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(from, to);
  //     resolve(conversions);
  //   }, 2000);
  // });
}

export default async (amount, from, to) => {
  await fetchConversionRates(supportedCurrencies).then(data => console.log(data));
  return {
    orig: formatOutput(amount, from),
    conversion: formatOutput(amount, to),
    possibleConversions: [],
    category: 'money',
  };
};
