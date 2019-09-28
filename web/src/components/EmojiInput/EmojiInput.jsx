import Input from '@material-ui/core/Input';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { extractEmoji } from '../../helpers/isEmoji';
import { changeEmoji } from '../../store/emoji/actions';
import { emojiSelector } from '../../store/selectors/emoji';

const StyledRemoveButton = styled.span`
  margin-left: 1em;
  cursor: pointer;
  font-size: 1.5em;
`;

const StyledInput = styled(Input)`
  input {
    &::placeholder {
      color: white;
    }
  }
`;

const EmojiInput = ({ autoFocus }) => {
  const input = useSelector(emojiSelector);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(changeEmoji(extractEmoji(event.target.value)));
  };
  const handleClear = () => dispatch(changeEmoji(''));

  const [node, setNode] = useState(null);

  const handleEnter = useCallback(
    (event) => {
      if (node && node.querySelector('input') && event.key === 'Enter') {
        node.querySelector('input').blur();
      }
    },
    [node]
  );

  useEffect(() => {
    if (autoFocus && node && node.querySelector('input')) {
      setTimeout(() => node.querySelector('input').focus(), 200);
    }
  }, [autoFocus, node]);

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [handleEnter]);

  return (
    <React.Fragment>
      <StyledInput
        id="emojiInput"
        innerRef={setNode}
        placeholder="your emoji"
        onChange={handleChange}
        value={input}
        inputProps={{
          'aria-label': 'emojis',
          style: {
            fontSize: '1.5em',
          },
        }}
      />
      <StyledRemoveButton role="img" aria-label="trash bin icon" onClick={handleClear}>
        🗑️
      </StyledRemoveButton>
    </React.Fragment>
  );
};

export default EmojiInput;
