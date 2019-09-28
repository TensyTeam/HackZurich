import { TIME_ADD } from '../constants';

const defaultState = 2 * 60; // 2h

export function timeReducer(state = defaultState, action) {
  switch (action.type) {
    case TIME_ADD:
      return action.payload;

    default:
      return state;
  }
}
