import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import currConverter from '../../src/converters/currencies';
import conversionMock from '../stub-data';

chai.use(sinonChai);

describe.only('Currency converter', () => {
  let fetchSpy, fakeServer;
  beforeEach(() => {
    global.window = {
      localStorage: {},
    };
  fakeServer = sinon.fakeServe.create();
  });

  afterEach(() => {
    fakeServer.restore();
  });

  it('should fetchConversionRate', () => {
    currConverter(1, 'USD', 'INR');
    expect(fetchSpy).to.have.been.called();
  });
  it('should store conversion rates in localstorage')
  it('should get cached conversion rates incase of error in fetching');
  it('should setup fx');
  it('should return output in the correct structure');
  it('should return 8 possible conversions which does not include to and from');
  it('should defalut to USD if to currency is not provided'); // update test on implementing LRU and default country.
  it('should return the format as money');
});

