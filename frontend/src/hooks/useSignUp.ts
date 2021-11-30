import { useState } from 'react';
import { auth } from '@/utils/aws'
import { useRouter } from 'next/router';

const useSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const res = await auth.signup(email, password);
      router.push('/activate');
    } catch (e) {
      console.error(e);
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    signUp,
  }
}

export default useSignUp