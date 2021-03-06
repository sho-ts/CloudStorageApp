import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFlash, useDispatch } from '@/hooks';
import { guestSignIn as storeGuestSignIn } from '@/stores/user/asyncThunk';
import { queryBuilder } from '@/utils';
import { auth } from '@/utils/aws'
import { MESSAGE_TYPE } from '@/utils/const'

const useLogic = () => {
  const router = useRouter();
  const flash = useFlash();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const query = queryBuilder({ email });

  const signUp = async () => {
    if (!email || !password || !name) {
      flash({
        message: '未入力の項目があります',
        type: MESSAGE_TYPE.ERROR
      })

      return;
    }

    try {
      await auth.signup(email, password, name);
      await router.push(`/activate?${query}`);

      flash({
        message: '認証コードをメールアドレスに送信しました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: '新規登録に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  const guestSignIn = async () => {
    try {
      await dispatch(storeGuestSignIn()).unwrap();
      await router.push('/mypage');

      flash({
        message: 'ゲスト状態でログインしました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: (e as { errorMessage: string }).errorMessage,
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    signUp,
    guestSignIn,
  }
}

export default useLogic;