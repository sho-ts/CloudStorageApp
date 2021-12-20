import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from '@/hooks';
import { checkAuth } from '@/stores/user/asyncThunk';

type Props = {
  notRedirect?: boolean,
}

const Auth: React.FC<Props> = ({ children, notRedirect }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(checkAuth()).unwrap();
        setIsChecked(true);
      } catch (e) {
        notRedirect ? setIsChecked(true) : router.replace('/');
      }
    })();
  }, [dispatch, router]);

  return (
    <>
      {isChecked && children}
    </>
  )
}

export default Auth;