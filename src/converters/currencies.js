import fx from 'money';
import { curry, map, zipWith, last, fromPairs, take, compose, reject, equals } from 'ramda';
// import conversions from '../helpers/conversions';
import supportedCurrencies from '../helpers/constants';
import formatOutput from '../helpers/format-output';

function fetchConversionRates(curencyList) {
  return fetch(`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22${curencyList.join(',')}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error('Unable to fetch conversion rate, falling back to cached conversion rates. ELSE');
        new Promise.reject(null);
      }
    })
    .catch(err => {
      console.error('Unable to fetch conversion rate, falling back to cached conversion rates. Then/Catch');
      return Promise.resolve(JSON.parse(localStorage.getItem('rates')));
    });
}

async function setupMoney(currencyList, base = 'USD') {
  const response = await fetchConversionRates(currencyList);
  localStorage.setItem('rates', JSON.stringify(response));
  const extractRate = ({ Name, Rate }) => ([[last(Name.split('/'))], +Rate]);
  fx.base = base;
  fx.rates = fromPairs(map(extractRate, response.query.results.rate));
}

export default (amount, from, to) => {
  setupMoney(supportedCurrencies);

  const convertTo = curry(toCurr => fx.convert(amount, { from, to: toCurr }));
  const formatCurrency = formatOutput('currency');
  const priorityCurrencies = compose(
    take(8),
    reject(equals(to)),
  )(supportedCurrencies);

  return {
    orig: formatCurrency(amount, from),
    conversion: formatCurrency(convertTo(to || 'USD'), to),
    possibleConversions: zipWith(
      formatCurrency,
      map(convertTo, priorityCurrencies),
      priorityCurrencies,
    ),
    category: 'money',
  };
};

// TODO: USE LRU cache to check supportedCurrencies
// TODO: Use Localstorage to cache conversion rates
// TODO: Use cerebro country to default toCurr
