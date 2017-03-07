import React, { PropTypes } from 'react';

const Conversions = ({ possibleConversions }) => (
  <ul>
    {possibleConversions.map(possibility => <li key={possibility.amount}>{possibility.amount} {possibility.unit}</li>)}
  </ul>
);

export default Conversions;

Conversions.propTypes = {
  possibleConversions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    unit: PropTypes.string,
  })).isRequired,
};
