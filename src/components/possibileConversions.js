import React, { PropTypes } from 'react';
import styles from '../styles.css';

const Possibilities = ({ possibleConversions }) => (
  <table>
    {possibleConversions.map(({ unit, amount }) =>
      <tr key={`${unit}${amount}`} className={styles.row}>
        <td className={styles.amount}>{amount}</td>
        <td className={styles.unit}>{unit}</td>
      </tr>)}
  </table>
);

Possibilities.propTypes = {
  amount: PropTypes.number,
  unit: PropTypes.string,
}.isRequired;

export default Possibilities;