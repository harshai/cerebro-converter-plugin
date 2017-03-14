import React, { PropTypes } from 'react';

import styles from './assets/styles.css';
import PossibleConversions from './components/possibile-conversions';
import MainConversion from './components/main-conversion';
import Icon from './components/icon';

const Conversions = ({ orig, conversion, possibleConversions, category }) => (
  <div>
    <Icon category={category} />
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
  category: PropTypes.string.isRequired,
};
