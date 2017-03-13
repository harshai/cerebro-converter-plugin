import React, { PropTypes } from 'react';
import styles from './styles.css';

const Possibilities = ({ amount, unit }) => (
  <tr className={styles.row}>
    <td className={styles.amount}>{amount}</td>
    <td className={styles.unit}>{unit}</td>
  </tr>
);

const Conversions = ({ orig, conversion, possibleConversions }) => (
  <div>
    <h2 className={styles.muted}>{orig.amount} {orig.unit}</h2>
    <h1 className={styles.regularText}>{conversion.amount} {conversion.unit}</h1>
    <hr className={styles.divider} />
    <table>
      {possibleConversions.map(possibility => Possibilities(possibility))}
    </table>
  </div>
);

export default Conversions;

Conversions.propTypes = {
  possibleConversions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  })).isRequired,
};
