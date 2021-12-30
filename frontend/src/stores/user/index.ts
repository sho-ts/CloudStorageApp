import { createSlice } from '@reduxjs/toolkit';
import { signIn, guestSignIn, signOut, checkAuth } from './asyncThunk';

const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isSignIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(guestSignIn.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.isSignIn = false;
    })
  }
});

export default slice.reducer;