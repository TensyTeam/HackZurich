import { data } from '../../services';
import { emojiSelector } from '../selectors/emoji';
import { locationSelector } from '../selectors/location';
import { currentTimeSelector } from '../selectors/time';

export const getData = () => (dipatch, getState) => {
  const emoji = emojiSelector(getState());
  const time = currentTimeSelector(getState());
  const location = locationSelector(getState());
  console.log('TCL: getData -> emoji && time && location', emoji, time, location);
  if (emoji && time && location) {
    return data(time, emoji, location);
  }
  return new Promise(() => []);
};
