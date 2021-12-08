import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from '@/hooks';
import { checkAuth } from '@/stores/user/asyncThunk';

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await dispatch(checkAuth()).unwrap();

      !result.isSignIn && router.replace('/');

      setIsChecked(true);
    })();
  }, [dispatch, router]);


  return (
    <>
      {isChecked && children}
    </>
  )
}

export default AuthProvider;