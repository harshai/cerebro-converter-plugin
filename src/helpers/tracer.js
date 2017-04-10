import { curry } from 'ramda';

export default curry((tag, x) => {
  console.log(tag, x);
  return x;
});

// TODO: Add tests
// TODO: Add flowtype annotations
