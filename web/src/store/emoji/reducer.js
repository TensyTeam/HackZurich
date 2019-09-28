import { EMOJI_ADD } from '../constants';

export function emojiReducer(state = '', action) {
  switch (action.type) {
    case EMOJI_ADD:
      return action.payload;

    default:
      return state;
  }
}
