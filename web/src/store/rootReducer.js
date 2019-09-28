import { combineReducers } from 'redux';

import { dataReducer } from './data/reducer';
import { emojiReducer } from './emoji/reducer';
import { locationReducer } from './location/reducer';
import { timeReducer } from './time/reducer';

export const rootReducer = combineReducers({
  emoji: emojiReducer,
  time: timeReducer,
  location: locationReducer,
  data: dataReducer,
});
