import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from '@/hooks';
import { signIn as storeSignIn } from '@/stores/user/asyncThunk';

const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await dispatch(storeSignIn({ username: email, password })).unwrap()

      if(!result.isSignIn) throw new Error;

      router.push('/mypage');
    } catch (e) {
      alert('ログインに失敗しました。\nメールアドレスとパスワードを確認して再度お試しください。');
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