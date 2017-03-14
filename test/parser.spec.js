import convert from 'convert-units';
import { expect } from 'chai';
import { head, forEach, last } from 'ramda';
import parser from '../src/parser';

describe('Parser', () => {
  const possibilities = convert().possibilities();
  const runTests = (unit) => {
    it(`should extract ${unit} after the amount`, () => {
      const token1 = parser(`1 ${unit}`);
      const token2 = parser(`1${unit}`);
      expect(head(token2.unit)).to.equal(unit);
      expect(head(token1.unit)).to.equal(unit);
    });

    it(`should pick up ${unit} before the amount`, () => {
      const token1 = parser(`${unit} 1`);
      const token2 = parser(`${unit}1`);
      expect(head(token2.unit)).to.equal(unit);
      expect(head(token1.unit)).to.equal(unit);
    });

    it(`should extract ${unit} without an amount`, () => {
      const tokens = parser(unit);
      expect(head(tokens.unit)).to.equal(unit);
    });

    it(`should extract different types of amounts for ${unit}`, () => {
      const tokens = parser(`100${unit}`);
      const tokens2 = parser(`762.12 ${unit}`);
      const tokens3 = parser(`123,762.12 ${unit}`);
      expect(head(tokens.amount)).to.equal('100');
      expect(head(tokens2.amount)).to.equal('762.12');
      expect(head(tokens3.amount)).to.equal('123762.12');
    });
  };

  forEach(runTests, possibilities);

  it('should extract inches (`in` is both inch and preposition in)', () => {
    const token1 = parser('1in ');
    const token2 = parser('1in in ');
    const token3 = parser('1 in in ');
    expect(head(token1.unit)).to.equal('in');
    expect(head(token2.unit)).to.equal('in');
    expect(token2.unit.length).to.equal(1);
    expect(head(token3.unit)).to.equal('in');
    expect(token3.unit.length).to.equal(1);
  });

  it('should extract both units', () => {
    const token = parser('1 ft in in');
    expect(head(token.unit)).to.equal('ft');
    expect(last(token.unit)).to.equal('in');
  });

  it('should ignore all units after the second unit', () => {
    const token = parser('1 ft in in kg km/s');
    expect(head(token.unit)).to.equal('ft');
    expect(last(token.unit)).to.equal('in');
  });
});
