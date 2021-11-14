import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { auth } from '@/utils/aws';
import { useDispatch } from '@/hooks';
import { setSignInState } from '@/stores/user';

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await auth.getUser();

      if (user) {
        dispatch(setSignInState({
          isSignIn: true
        }))
        setIsChecked(true);
      } else {
        dispatch(setSignInState({
          isSignIn: false
        }))
        router.replace('/');
      }

    })();
  }, [dispatch, router]);


  return (
    <>
      {isChecked && children}
    </>
  )
}

export default AuthProvider;