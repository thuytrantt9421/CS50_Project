import { combineReducers } from "redux";

import { TRACK, ALBUM, PLAYTRACK, PLAYALBUM } from "./action";

const merge = (prev, next) => Object.assign([], next);

const trackReducer = (state = {}, action) => {
  if (action.type === TRACK) return action.payload;
  return state;
};

const albumReducer = (state = {}, action) => {
  if (action.type === ALBUM) return action.payload;
  return state;
};

const typeReducer = (state = "", action) => {
  if (action.type === PLAYTRACK) return PLAYTRACK;
  if (action.type === PLAYALBUM) return PLAYALBUM;
  return state;
};

const reducer = combineReducers({
  track: trackReducer,
  album: albumReducer,
  typeForPlay: typeReducer,
});

export default reducer;
