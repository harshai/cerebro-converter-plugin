import React, { PropTypes } from 'react';
import SVGInline from 'react-svg-inline';

import styles from '../assets/styles.css';

import mass from '../assets/icons/mass.svg';
import area from '../assets/icons/area.svg';
import volume from '../assets/icons/volume.svg';
import pressure from '../assets/icons/pressure.svg';
import time from '../assets/icons/time.svg';
import speed from '../assets/icons/speed.svg';
import length from '../assets/icons/length.svg';
import partsPer from '../assets/icons/partsPer.svg';
import digital from '../assets/icons/digital.svg';
import generic from '../assets/icons/generic.svg';
import temperature from '../assets/icons/temperature.svg';
import money from '../assets/icons/money.svg';

const svgStyles = {
  width: '2.5rem',
  height: '2.5rem',
  fill: 'currentColor',
};

const chooseIcon = (category) => {
  switch (category) {
    case 'length':
      return <SVGInline {...svgStyles} svg={length} />;
    case 'area':
      return <SVGInline {...svgStyles} svg={area} />;
    case 'mass':
      return <SVGInline {...svgStyles} svg={mass} />;
    case 'volume':
      return <SVGInline {...svgStyles} svg={volume} />;
    case 'pressure':
      return <SVGInline {...svgStyles} svg={pressure} />;
    case 'time':
      return <SVGInline {...svgStyles} svg={time} />;
    case 'speed':
      return <SVGInline {...svgStyles} svg={speed} />;
    case 'partsPer':
      return <SVGInline {...svgStyles} svg={partsPer} />;
    case 'digital':
      return <SVGInline {...svgStyles} svg={digital} />;
    case 'temperature':
      return <SVGInline {...svgStyles} svg={temperature} />;
    case 'money':
      return <SVGInline {...svgStyles} svg={money} />;
    default:
      return <SVGInline {...svgStyles} svg={generic} />;
  }
};

const Icon = ({ category }) => (
  <div className={styles.icon}>{chooseIcon(category)}</div>
);

Icon.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Icon;
// TODO: Remove repetition in this file.
