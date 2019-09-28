import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentTimeSelector } from '../../store/selectors/time';
import { changeTime } from '../../store/time/actions';
import SelectedTime from '../SelectedTime/SelectedTime';
import TimePicker from '../TimePicker/TimePicker';

const TimeWidget = () => {
  const time = useSelector(currentTimeSelector);
  const dispatch = useDispatch();
  const handleTimeChange = (value) => dispatch(changeTime(value));

  return (
    <React.Fragment>
      <TimePicker handleChange={handleTimeChange} time={time} />
      <SelectedTime />
    </React.Fragment>
  );
};

export default TimeWidget;
