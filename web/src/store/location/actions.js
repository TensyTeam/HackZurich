import { getLocation } from '../../helpers/getLocation';
import { LOCATION_ADD } from '../constants';
import { locationSelector } from '../selectors/location';

const add = (location) => ({
  type: LOCATION_ADD,
  payload: location,
});

export const addLocation = () => (dispatch, getState) => {
  const location = locationSelector(getState());
  if (!location) {
    getLocation((value) => dispatch(add(value)));
  }
};
