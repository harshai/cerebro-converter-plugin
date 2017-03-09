import convert from 'convert-units';
import { expect } from 'chai';
import { head, forEach } from 'ramda';
import parser from '../src/parser';

describe('Parser', () => {
  const possibilities = convert().possibilities();
  describe('Units', () => {
    const runTests = (unit) => {
      it(`should extract ${unit} when typed with spaces`, () => {
        const tokens = parser(`1 ${unit}`);
        expect(head(tokens.unit)).to.equal(unit);
      });

      it(`should extract ${unit} when typed without spaces`, () => {
        const tokens = parser(`1${unit}`);
        expect(head(tokens.unit)).to.equal(unit);
      });

      it(`should extract ${unit} without an amount`, () => {
        const tokens = parser(unit);
        expect(head(tokens.unit)).to.equal(unit);
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
  });

  describe('amounts', () => {
    const runTests = (unit) => {
      it(`should extract the amount from front of ${unit}`, () => {
        const tokens = parser(`100${unit}`);
        const tokens2 = parser(`402 ${unit}`);
        const tokens3 = parser(`762.12 ${unit}`);
        const tokens4 = parser(`123,762.12 ${unit}`);
        expect(head(tokens.amount)).to.equal('100');
        expect(head(tokens2.amount)).to.equal('402');
        expect(head(tokens3.amount)).to.equal('762.12');
        expect(head(tokens4.amount)).to.equal('123762.12');
      });
      it(`should extract the amount following ${unit}`, () => {
        const tokens = parser(`${unit}100`);
        const tokens2 = parser(`${unit} 402`);
        const tokens3 = parser(`${unit} 762.12`);
        const tokens4 = parser(`${unit} 123,762.12`);
        expect(head(tokens.amount)).to.equal('100');
        expect(head(tokens2.amount)).to.equal('402');
        expect(head(tokens3.amount)).to.equal('762.12');
        expect(head(tokens4.amount)).to.equal('123762.12');
      });
    };

    forEach(runTests, possibilities);
  });
});
