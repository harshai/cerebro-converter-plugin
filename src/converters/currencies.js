import fx from 'money';
import { curry, map, zipWith, last, fromPairs } from 'ramda';
// import conversions from '../helpers/conversions';
import supportedCurrencies from '../helpers/constants';
import formatOutput from '../helpers/format-output';

function fetchConversionRates(curencyList) {
  return fetch(`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${curencyList.join(',')}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
    .then(res => res.json());
}

async function setupMoney(currencyList, base = 'USD') {
  const response = await fetchConversionRates(currencyList);
  const extractRate = ({ Name, Rate }) => ([[last(Name.split('/'))], +Rate]);
  fx.base = base;
  fx.rates = fromPairs(map(extractRate, response.query.results.rate));
}

export default (amount, fromCurr, toCurr) => {
  setupMoney(supportedCurrencies);

  const convertTo = curry(to => fx.convert(amount, { from: fromCurr, to }));
  const formatCurrency = formatOutput('currency');

  return {
    orig: formatCurrency(amount, fromCurr),
    conversion: formatCurrency(convertTo(toCurr || 'USD'), toCurr),
    possibleConversions: zipWith(
      formatCurrency,
      map(convertTo, supportedCurrencies),
      supportedCurrencies,
    ),
    category: 'money',
  };
};

// TODO: USE LRU cache to check supportedCurrencies
// TODO: Use Localstorage to cache conversion rates
// TODO: Use cerebro country to default toCurr
