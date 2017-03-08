import convert from 'convert-units';
import { expect } from 'chai';
import { head, forEach } from 'ramda';
import parser from '../src/parser';

describe('Parser', () => {
  describe('Units', () => {
    const possibilities = ["m", "m/s", "s"];
    const runTest = (unit) => {
      it(`should extract ${unit} when typed with spaces`, () => {
        const tokens = parser(`1 ${unit}`);
        expect(head(tokens.unit)).to.equal(unit);
      });

      xit(`should extract ${unit} when typed without spaces`, () => {
        const tokens = parser(`1 ${unit}`);
        expect(head(tokens.unit)).to.equal(unit);
      });

      xit(`should extract ${unit} without an amount`, () => {
        const tokens = parser(unit);
        expect(head(tokens.unit)).to.equal(unit);
      });
    };

    forEach(runTest, possibilities);

    xit('should extract inches (`in` is both inch and preposition in)', () => {
      const token1 = parser('1in');
      const token2 = parser('1in in');
      const token3 = parser('1 in in');
      expect(head(token1.unit)).to.equal('in');
      expect(head(token2.unit)).to.equal('in');
      expect(head(token3.unit)).to.equal('in');
    });
  });

  describe('amounts', () => {

  });

  describe('prepositions', () => {

  });
});
