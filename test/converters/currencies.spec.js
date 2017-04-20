import chai, { expect } from 'chai';
import currConverter from '../../src/converters/currencies';
chai.use(chaiThings);

describe('Currency converter', () => {
    it('should fetchConversionRates and store them in localstorage');
    it('should get cached conversion rates incase of error in fetching');
    it('should setup fx');
    it('should return output in the correct structure');
    it('should return 8 possible conversions which does not include to and from');
    it('should defalut to USD if to currency is not provided'); // update test on implementing LRU and default country.
    it('should return the format as money');
});
