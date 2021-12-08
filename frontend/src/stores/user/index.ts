import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, checkAuth } from './asyncThunk';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isSignIn: false
  },
  reducers: {
    setSignInState: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isSignIn = action.payload.isSignIn;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      if (action.payload) {
        state.email = '';
        state.isSignIn = false;
      }
    })
  }
});

export default slice.reducer;
export const { setSignInState } = slice.actions;