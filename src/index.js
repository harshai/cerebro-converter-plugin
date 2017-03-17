import { compose } from 'ramda';
import converter from './converter';
import parse from './parser';
import DisplayResults from './display-results';


const doNothing = results => !results;

const plugin = ({ term, display }) => {
  const results = compose(
    converter,
    parse,
  )(term);

  if (doNothing(results)) return;

  display({
    title: `${results.orig.amount} ${results.orig.unit} = ${results.conversion.amount} ${results.conversion.unit}`,
    getPreview: () => DisplayResults(results),
  });
};

module.exports = {
  fn: plugin,
};

