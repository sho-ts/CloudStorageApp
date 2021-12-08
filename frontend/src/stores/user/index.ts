import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, checkAuth } from './asyncThunk';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isSignIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.email = '';
      state.isSignIn = false;
    })
  }
});

export default slice.reducer;