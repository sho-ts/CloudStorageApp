import type { UserStoreType } from '@/types/UserStoreType';
import type { ApiUserType } from '@/types/ApiUserType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '@/utils/aws';
import { createAxiosInstance } from '@/utils';
import { PLAN_TYPE } from '@/utils/const';

export const signIn = createAsyncThunk<UserStoreType, { username: string, password: string }>(
  'user/signin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await auth.signin(username, password);
      const user = await auth.getUser();

      if (!user) throw new Error();

      const axiosInstance = await createAxiosInstance();
      const res = await axiosInstance.post<ApiUserType>(`/user`, { name: '' });

      const { name, plan, storage } = res.data;

      return {
        isSignIn: true,
        email: username,
        name,
        plan,
        storage
      };
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'ログインに失敗しました'
      })
    }
  }
);

export const guestSignIn = createAsyncThunk<UserStoreType>(
  'user/guestSignin',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signin(process.env.NEXT_PUBLIC_GUEST_EMAIL ?? '', process.env.NEXT_PUBLIC_GUEST_PASSWORD ?? '');
      const user = await auth.getUser();

      if (!user) throw new Error();

      const axiosInstance = await createAxiosInstance();
      const res = await axiosInstance.post<ApiUserType>(`/user`, { name: '' });

      const { storage } = res.data;

      return {
        isSignIn: true,
        email: `__guest__${process.env.NEXT_PUBLIC_GUEST_KEY}`,
        name: 'ゲスト',
        plan: PLAN_TYPE.GUEST,
        storage
      };
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'ログインに失敗しました'
      })
    }
  }
);

export const checkAuth = createAsyncThunk<UserStoreType>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const user = await auth.getUser();

      if (!user) throw new Error();

      const axiosInstance = await createAxiosInstance();
      const res = await axiosInstance.post<ApiUserType>(`/user`, { name: '' });

      const { name, plan, storage } = res.data;

      const { email } = await auth.getCognitoUserAttributes(user);
      const isGuest = email === process.env.NEXT_PUBLIC_GUEST_EMAIL;

      return {
        isSignIn: true,
        email: isGuest ? `__guest__${process.env.NEXT_PUBLIC_GUEST_KEY}` : email,
        name: isGuest ? 'ゲスト' : name,
        plan: isGuest ? PLAN_TYPE.GUEST : plan,
        storage,
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

export const changeUserData = createAsyncThunk<{ name: string }, { name: string }>(
  'user/change',
  async ({ name }, { rejectWithValue }) => {
    try {
      const axiosInstance = await createAxiosInstance();
      const res = await axiosInstance.put<ApiUserType>('/user', { name });

      return {
        name: res.data.name
      }
    } catch (e) {
      return rejectWithValue({
        errorMessage: 'プロフィールの更新に失敗しました'
      })
    }
  }
)