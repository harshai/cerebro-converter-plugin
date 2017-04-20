import chai, { expect } from 'chai';
import { forEach } from 'ramda';
import converter from '../src/converter';

describe('Converter', () => {
  it('should call convertCurrencies', () => {
    const input = {
      amount: [],
      unit: [],
      currency: ['INR', 'USD']
    };
    expect(() => converter(input)).to.throw('fx error'); // TODO: Fix this test.
  });

  it('should call convertUnis', () => {
    const input = {
      amount: [],
      unit: ['kg', 'lb'],
      currency: []
    }
    expect(converter(input)).to.have.keys(['orig', 'conversion', 'possibleConversions', 'category']);
  });

  it('should return null', ()=> {
    const input = {
      amount: [],
      unit: [],
      currency: []
    };
    expect(converter(input)).to.be.null;
  });
});
