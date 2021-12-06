import { useState } from 'react';
import { auth } from '@/utils/aws';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from '@/hooks';
import { resetPostState } from '@/stores/post';
import { setSignInState } from '@/stores/user';

const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const res = await auth.signin(email, password);

      dispatch(resetPostState());
      dispatch(setSignInState({
        isSignIn: true,
        email
      }))

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