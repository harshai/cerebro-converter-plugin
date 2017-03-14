import React, { PropTypes } from 'react';
import styles from './styles.css';

import PossibleConversions from './components/possibileConversions.js';
import MainConversion from './components/mainConversion.js';

const Conversions = ({ orig, conversion, possibleConversions }) => (
  <div>
    <MainConversion orig={orig} conversion={conversion} />
    <hr className={styles.divider} />
    <PossibleConversions possibleConversions={possibleConversions} />
  </div>
);

export default Conversions;

Conversions.propTypes = {
  possibleConversions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  })).isRequired,
  orig: PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
  conversion: PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
};
