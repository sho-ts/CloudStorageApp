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
      await dispatch(storeSignIn({ username: email, password })).unwrap();
      router.push('/mypage');
    } catch (e) {
      alert((e as { errorMessage: string }).errorMessage);
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