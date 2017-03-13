import React, { PropTypes } from 'react';
import styles from './styles.css';

const Conversions = ({ possibleConversions }) => (
  <ul>
    {possibleConversions.map(
      possibility =>
        <li className={styles.listItem} key={possibility.amount}>{possibility.amount} {possibility.unit}</li>)}
  </ul>
);

export default Conversions;

Conversions.propTypes = {
  possibleConversions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  })).isRequired,
};
