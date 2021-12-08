import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '@/utils/aws';

type User = {
  email: string,
  isSignIn: boolean
}

export const signIn = createAsyncThunk<User, { username: string, password: string }>(
  'user/signin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await auth.signin(username, password);

      if (!res) throw new Error();

      return {
        isSignIn: true,
        email: username
      };
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'サインインに失敗しました'
      })
    }
  }
);

export const checkAuth = createAsyncThunk<User>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const user = await auth.getUser();

      if (!user) throw new Error();

      return {
        isSignIn: true,
        email: user.getCognitoUserAttribute('email')!
      }
    } catch (e) {
      return rejectWithValue({
        errorMessage: '認証していません'
      })
    }
  }
)

export const signOut = createAsyncThunk<boolean>(
  'user/signout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await auth.signout();

      if (!res) throw new Error();

      return true;
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'ログアウトに失敗しました'
      })
    }
  }
);