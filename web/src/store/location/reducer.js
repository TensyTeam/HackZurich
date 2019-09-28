import { LOCATION_ADD } from '../constants';

export function locationReducer(state = '', action) {
  switch (action.type) {
    case LOCATION_ADD:
      return action.payload;

    default:
      return state;
  }
}
