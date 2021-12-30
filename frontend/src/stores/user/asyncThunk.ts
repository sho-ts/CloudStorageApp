import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '@/utils/aws';

type User = {
  name: string,
  email: string,
  isSignIn: boolean,
}

export const signIn = createAsyncThunk<User, { username: string, password: string }>(
  'user/signin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await auth.signin(username, password);
      const user = await auth.getUser();

      if (!user) throw new Error();

      return {
        isSignIn: true,
        email: username,
        name: user.getCognitoUserAttribute('name') || ''
      };
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'サインインに失敗しました'
      })
    }
  }
);

export const guestSignIn = createAsyncThunk<User>(
  'user/guestSignin',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signin(process.env.NEXT_PUBLIC_GUEST_EMAIL ?? '', process.env.NEXT_PUBLIC_GUEST_PASSWORD ?? '');

      return {
        isSignIn: true,
        email: '__guest__',
        name: 'ゲスト'
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

      if (!user) throw new Error()

      return {
        isSignIn: true,
        email: user.getCognitoUserAttribute('email') || '',
        name: user.getCognitoUserAttribute('name') || ''
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