import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useDispatch } from '@/hooks';
import { setSignInState } from '@/stores/user';

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const unsubsucribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setSignInState({
          uid: user.uid,
          email: user.email,
          isSignIn: true
        }))
        setIsChecked(true)
      } else {
        setIsChecked(true)
      }
    });

    return () => {
      unsubsucribe();
    }
  }, [dispatch]);


  return (
    <>
      {isChecked && children}
    </>
  )
}

export default AuthProvider;