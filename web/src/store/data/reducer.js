import { DATA_ADD } from '../constants';

export function dataReducer(state = '', action) {
  switch (action.type) {
    case DATA_ADD:
      return action.payload;

    default:
      return state;
  }
}
