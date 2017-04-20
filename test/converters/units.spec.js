import chai, { expect } from 'chai';
import { forEach } from 'ramda';
import chaiThings from 'chai-things';
import unitConverter from '../../src/converters/units';

chai.use(chaiThings);

describe.only('Unit converter', () => {
  it('should not include from unit in possible conversions', () => {
    const conversion = unitConverter(2, 'kg', 'kg');
    expect(conversion.possibleConversions).to.not.contain.a.thing.with.property('unit', 'kg');
  });

  it('should return all possibilities for given unit', () => {
    const conversion = unitConverter(1, 'kg', 'kg');
    expect(conversion.possibleConversions).to.have.length.above(0);
    expect(conversion.possibleConversions).to.all.have.property('unit');
    expect(conversion.possibleConversions).to.all.have.property('amount');
  });

  it('should return best conversion if no to unit is given', () => {
    const conversion = unitConverter(1, 'kg', 'kg');
    expect(conversion.conversion).to.deep.equal({ amount: '1,000', unit: 'grams' });
  });

  it('should return to conversion when to unit is given', () => {
    const conversion = unitConverter(4, 'week', 'd');
    expect(conversion.conversion).to.deep.equal({ amount: '28', unit: 'days' });
  });

  it('should return original amount and unit', () => {
    const conversion = unitConverter(1, 'kg', 'kg');
    expect(conversion.orig).to.deep.equal({ amount: '1', unit: 'kilogram' });
  });

  it('should return the conversion category', () => {
    const data = [{
      unit: 'kg',
      category: 'mass',
    }, {
      unit: 'l',
      category: 'volume',
    }, {
      unit: 's',
      category: 'time',
    }, {
      unit: 'm',
      category: 'length',
    }, {
      unit: 'm2',
      category: 'area',
    }, {
      unit: 'bar',
      category: 'pressure',
    }, {
      unit: 'C',
      category: 'temperature',
    }, {
      unit: 'km/h',
      category: 'speed',
    }, {
      unit: 'b',
      category: 'digital',
    }, {
      unit: 'ppm',
      category: 'partsPer',
    },
    ];
    const runTest = (unitObj) => {
      const conversion = unitConverter(1, unitObj.unit, unitObj.unit);
      expect(conversion.category).to.equal(unitObj.category);
    };

    forEach(runTest, data);
  });
});

// TODO: Split this file based on converters.
