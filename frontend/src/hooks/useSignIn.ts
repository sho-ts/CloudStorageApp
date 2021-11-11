import { useState } from 'react';
import { cognitoSignIn } from '@/utils'

const useSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const res = await cognitoSignIn(email, password);
      console.log(res);
    } catch (e) {
      console.error(e);
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