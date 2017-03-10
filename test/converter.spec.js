import { expect } from 'chai';
import spies from 'chai-spies';
import converter from '../src/converter';

describe('Converter', () => {
  it('Should default amount to 1 when no unit is present');
  it('Should not include from unit in possible conversions');
  it('Should return all possibilities for given unit');
  it('Should return null if no from unit is there');
  it('Should return best conversion if no to unit is given');
  it('Should return to conversion when to unit is given');
  it('Should return original amount and unit');
});

