import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useFlash } from '@/hooks';
import { signIn as storeSignIn } from '@/stores/user/asyncThunk';
import { MESSAGE_TYPE } from '@/utils/const'

const useSignIn = () => {
  const router = useRouter();
  const flash = useFlash();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await dispatch(storeSignIn({ username: email, password })).unwrap();
      flash({
        message: 'ログインしました',
        type: MESSAGE_TYPE.NOTICE
      })
      router.push('/mypage');
    } catch (e) {
      flash({
        message: (e as { errorMessage: string }).errorMessage,
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    signIn,
  }
}

export default useSignIn