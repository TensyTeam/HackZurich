import { EMOJI_ADD } from '../constants';
import { emojiSelector } from '../selectors/emoji';

const addEmojiInput = (text) => ({
  type: EMOJI_ADD,
  payload: text,
});

export const changeEmoji = (text) => (dispatch) => {
  dispatch(addEmojiInput(text));
};

export const appendEmoji = (text) => (dispatch, getState) => {
  const currentInput = emojiSelector(getState());
  dispatch(addEmojiInput(`${currentInput}${text}`));
};
