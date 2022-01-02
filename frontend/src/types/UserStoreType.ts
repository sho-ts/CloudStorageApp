import { PLAN_TYPE } from '@/utils/const';

export type UserStoreType = {
  name: string,
  email: string,
  isSignIn: boolean,
  plan: PLAN_TYPE,
  storage: number
}