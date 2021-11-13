import { useState, useEffect } from 'react';
import { auth } from '@/utils/aws';
import { useDispatch } from '@/hooks';
import { setSignInState } from '@/stores/user';

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await auth.getUser();

      if (user instanceof Error) {
        dispatch(setSignInState({
          isSignIn: true
        }))
        setIsChecked(true);
      } else {
        dispatch(setSignInState({
          isSignIn: false
        }))
        setIsChecked(true);
      }

    })();
  }, [dispatch]);


  return (
    <>
      {isChecked && children}
    </>
  )
}

export default AuthProvider;