import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user';
import postReducer from './post';

const reducer = combineReducers({
  user: userReducer,
  post: postReducer,
})

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;