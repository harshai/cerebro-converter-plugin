import { curry } from 'ramda';

export default curry((tag, x) => {
  console.log(tag, x);
  return x;
});
