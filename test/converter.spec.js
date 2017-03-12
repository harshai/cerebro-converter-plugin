import chai, { expect } from 'chai';
import chaiThings from 'chai-things';
import converter from '../src/converter';

chai.use(chaiThings);

describe('Converter', () => {
  it('Should default amount to 1 when no unit is present', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.orig.amount).to.equal(1);
  });

  it('Should not include from unit in possible conversions', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.possibleConversions).to.not.contain.a.thing.with.property('unit', 'kg');
  });

  it('Should return all possibilities for given unit', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.possibleConversions).to.have.length.above(0);
    expect(conversion.possibleConversions).to.all.have.property('unit');
    expect(conversion.possibleConversions).to.all.have.property('amount');
  });

  it('Should return null if no from unit is there', () => {
    const data = {
      unit: [],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion).to.be.null;
  });

  it('Should return best conversion if no to unit is given', () => {
    const data = {
      unit: ['kg'],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion.conversion).to.deep.equal({ amount: 1000, unit: 'g' });
  });

  it('Should return to conversion when to unit is given', () => {
    const data = {
      unit: ['week', 'd'],
      amount: [4],
    };
    const conversion = converter(data);
    expect(conversion.conversion).to.deep.equal({ amount: 28, unit: 'd' });
  });

  it('Should return original amount and unit', () => {
    const data = {
      unit: ['kg'],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion.orig).to.deep.equal({ amount: 1, unit: 'kg' });
  });
});

