import PropTypes from 'prop-types';
import React from 'react';
import { CircleSlider } from 'react-circle-slider';

const RADIUS = 300;
const STEP_SIZE = 10; // minutes
const MAX = 8 * 60; // 8 hours
const MIN = 30;

const TimePicker = ({ handleChange, time }) => {
  return (
    <CircleSlider
      size={RADIUS}
      max={MAX}
      min={MIN}
      shadow={false}
      stepSize={STEP_SIZE}
      value={time}
      onChange={handleChange}
      gradientColorFrom="#FDC830"
      gradientColorTo="#F37335"
      progressColor="#86A8E7"
    />
  );
};

TimePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default TimePicker;
