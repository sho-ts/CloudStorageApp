import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user';

const reducer = combineReducers({
  user: userReducer
})

export default configureStore({ reducer });