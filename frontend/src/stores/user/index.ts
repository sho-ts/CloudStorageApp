import type { UserStoreType } from '@/types/UserStoreType';
import { createSlice } from '@reduxjs/toolkit';
import { signIn, guestSignIn, signOut, checkAuth } from './asyncThunk';
import { PLAN_TYPE } from '@/utils/const'

const slice = createSlice<UserStoreType, {}, 'user'>({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isSignIn: false,
    plan: PLAN_TYPE.FREE,
    storage: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
      state.plan = action.payload.plan;
      state.storage = action.payload.storage;
    });
    builder.addCase(guestSignIn.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
      state.plan = action.payload.plan;
      state.storage = action.payload.storage;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
      state.plan = action.payload.plan;
      state.storage = action.payload.storage;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.isSignIn = false;
      state.plan = PLAN_TYPE.FREE;
      state.storage = 0;
    })
  }
});

export default slice.reducer;