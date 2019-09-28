import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { emojiSelector } from '../../store/selectors/emoji';

const StyledTitle = styled.div`
  text-align: center;
  font-size: 2em;
  letter-spacing: 4px;
`;

const EmojiList = () => {
  const emojiInput = useSelector(emojiSelector);
  return <StyledTitle>{emojiInput}</StyledTitle>;
};

export default EmojiList;
