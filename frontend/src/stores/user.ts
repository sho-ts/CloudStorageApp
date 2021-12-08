import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '@/utils/aws';

type User = {
  email: string,
  isSignIn: boolean
}

export const signIn = createAsyncThunk<User, { username: string, password: string }>(
  'user/signin',
  async ({ username, password }) => {
    try {
      const res = await auth.signin(username, password);

      if (!res) throw new Error();

      return {
        isSignIn: true,
        email: username
      };
    } catch (e) {
      return {
        isSignIn: false,
        email: ''
      }
    }
  }
);

export const signOut = createAsyncThunk<boolean>(
  'user/signout',
  async () => {
    try {
      const res = await auth.signout();

      if (!res) throw new Error();

      return true;
    } catch (e) {
      return false;
    }
  }
);

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