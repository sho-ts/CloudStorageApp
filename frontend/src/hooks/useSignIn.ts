import { useState } from 'react';
import { auth } from '@/utils/aws';
import { useRouter } from 'next/router';

const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const res = await auth.signin(email, password);
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