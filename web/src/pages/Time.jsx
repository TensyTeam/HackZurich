import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button/Button';
import EmojiInput from '../components/EmojiInput/EmojiInput';
import GridLayout from '../components/GridLayout/GridLayout';
import TimeWidget from '../components/TimeWidget/TimeWidget';
import { routes } from '../constants';

const Time = () => {
  const { push } = useHistory();
  const handleClickNext = () => push(routes.map);
  const handleClickBack = () => push(routes.main);
  return (
    <GridLayout
      header={<EmojiInput />}
      body={<TimeWidget />}
      footer={[
        <Button key="back" label="Back" icon="👈" handleClick={handleClickBack} left />,
        <Button key="next" label="Next" icon="👉" handleClick={handleClickNext} />,
      ]}
    />
  );
};

export default Time;
