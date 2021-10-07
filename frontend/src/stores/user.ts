import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    uid: '',
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
  }
});

export default slice.reducer;
export const { setSignInState } = slice.actions;