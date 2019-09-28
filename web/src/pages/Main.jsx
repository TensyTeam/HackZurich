import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../components/Button/Button';
import Categories from '../components/Categories/Categories';
import EmojiInput from '../components/EmojiInput/EmojiInput';
import GridLayout from '../components/GridLayout/GridLayout';
import { routes } from '../constants';
import { emojiSelector } from '../store/selectors/emoji';

const Main = ({ history: { push } }) => {
  const emojiInput = useSelector(emojiSelector);
  const handleClick = () => push(routes.time);
  return (
    <GridLayout
      header={<EmojiInput autoFocus />}
      body={<Categories />}
      footer={<Button handleClick={handleClick} disabled={!emojiInput} label="Next" icon="👉" />}
    />
  );
};

export default withRouter(Main);
