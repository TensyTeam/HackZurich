import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { formatTime } from '../../helpers/formatTime';
import { currentTimeSelector } from '../../store/selectors/time';

const Time = styled.span`
  position: absolute;
  font-size: 2em;
  color: azure;
`;

const SelectedTime = ({ className = '' }) => {
  const time = useSelector(currentTimeSelector);
  const { days, hours, minutes } = formatTime(time);

  return (
    <Time className={className}>
      {days ? `${days}D ` : ''}
      {hours}H {minutes}M
    </Time>
  );
};

export default SelectedTime;
