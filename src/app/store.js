import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalReducer from '*/Common/GlobalState.js';
const rootReducer = combineReducers({
  global: globalReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;