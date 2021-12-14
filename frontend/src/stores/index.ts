import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user';
import searchReducer from './search';
import windowSizeReducer from './windowSize';
import flashReducer from './flash';

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  windowSize: windowSizeReducer,
  flash: flashReducer,
})

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;