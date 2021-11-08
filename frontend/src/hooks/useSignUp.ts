import { useState } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import { setSignInState } from '@/stores/user';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const useSignUp = async () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if (!email || !password) return;

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      if (user) {
        dispatch(setSignInState({
          uid: user.uid,
          email,
          isSignIn: true
        }))
      }
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