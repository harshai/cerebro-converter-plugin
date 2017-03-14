import React, { PropTypes } from 'react';
import styles from '../styles.css';

const MainConversion = ({ orig, conversion }) => (
  <div className={styles.textCenter}>
    <h2 className={`${styles.muted} ${styles.noVerticalMargin}`}>{orig.amount} {orig.unit}</h2>
    <h1 className={`${styles.regularText} ${styles.noVerticalMargin}`}>{conversion.amount} {conversion.unit}</h1>
  </div>
);

MainConversion.propTypes = {
  orig: PropTypes.shape({
    amount: PropTypes.string,
    unit: PropTypes.string,
  }).isRequired,
  conversion: PropTypes.shape({
    amount: PropTypes.string,
    unit: PropTypes.string,
  }).isRequired,
};

export default MainConversion;
