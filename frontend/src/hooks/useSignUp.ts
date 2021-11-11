import { useState } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import { setSignInState } from '@/stores/user';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { cognitoSignUp } from '@/utils'

const useSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const res = await cognitoSignUp(email, password);
      console.log(res);
      // const user = userCredential.user;

      // if (user) {
      //   dispatch(setSignInState({
      //     uid: user.uid,
      //     email,
      //     isSignIn: true
      //   }))
      // }
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