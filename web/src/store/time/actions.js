import { TIME_ADD } from '../constants';
import { emojiSelector } from '../selectors/emoji';

const addTimeInput = (time) => ({
  type: TIME_ADD,
  payload: time,
});

export const changeTime = (time) => (dispatch) => {
  dispatch(addTimeInput(time));
};
