import { useState } from 'react';
import { cognitoSignUp } from '@/utils'

const useSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const res = await cognitoSignUp(email, password);
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
    signUp,
  }
}

export default useSignUp