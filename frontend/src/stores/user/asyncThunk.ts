import { createAsyncThunk } from '@reduxjs/toolkit';
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