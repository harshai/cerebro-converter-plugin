import chai, { expect } from 'chai';
import { forEach } from 'ramda';
import chaiThings from 'chai-things';
import converter from '../src/converter';

chai.use(chaiThings);

describe('Converter', () => {
  it('should default amount to 1 when no unit is present and unit to be signular', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.orig.amount).to.equal('1');
    expect(conversion.orig.unit).to.equal('kilogram');
  });

  it('should not include from unit in possible conversions', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.possibleConversions).to.not.contain.a.thing.with.property('unit', 'kg');
  });

  it('should return all possibilities for given unit', () => {
    const data = {
      unit: ['kg'],
      amount: [],
    };
    const conversion = converter(data);
    expect(conversion.possibleConversions).to.have.length.above(0);
    expect(conversion.possibleConversions).to.all.have.property('unit');
    expect(conversion.possibleConversions).to.all.have.property('amount');
  });

  it('should return null if no from unit is there', () => {
    const data = {
      unit: [],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion).to.be.null;
  });

  it('should return best conversion if no to unit is given', () => {
    const data = {
      unit: ['kg'],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion.conversion).to.deep.equal({ amount: '1,000', unit: 'grams' });
  });

  it('should return to conversion when to unit is given', () => {
    const data = {
      unit: ['week', 'd'],
      amount: [4],
    };
    const conversion = converter(data);
    expect(conversion.conversion).to.deep.equal({ amount: '28', unit: 'days' });
  });

  it('should return original amount and unit', () => {
    const data = {
      unit: ['kg'],
      amount: [1],
    };
    const conversion = converter(data);
    expect(conversion.orig).to.deep.equal({ amount: '1', unit: 'kilogram' });
  });

  it('should return the conversion category', () => {
    const data = [{
      unit: ['kg'],
      amount: [1],
      category: 'mass',
    }, {
      unit: ['l'],
      amount: [1],
      category: 'volume',
    }, {
      unit: ['s'],
      amount: [1],
      category: 'time',
    }, {
      unit: ['m'],
      amount: [1],
      category: 'length',
    }, {
      unit: ['m2'],
      amount: [1],
      category: 'area',
    }, {
      unit: ['bar'],
      amount: [1],
      category: 'pressure',
    }, {
      unit: ['C'],
      amount: [1],
      category: 'temperature',
    }, {
      unit: ['km/h'],
      amount: [1],
      category: 'speed',
    }, {
      unit: ['b'],
      amount: [1],
      category: 'digital',
    }, {
      unit: ['ppm'],
      amount: [1],
      category: 'partsPer',
    },
    ];
    const runTest = (unitObj) => {
      const conversion = converter(unitObj);
      expect(conversion.category).to.equal(unitObj.category);
    };

    forEach(runTest, data);
  });
});

