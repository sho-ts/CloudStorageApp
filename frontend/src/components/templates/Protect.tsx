import { useEffect } from 'react';
import { useSelector } from '@/hooks';
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

const Protect: React.FC<Props> = ({ children }) => {
  const user = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    !user.isSignIn && router.replace('/');
  });

  return (
    <>
      {children}
    </>
  )
}

export default Protect;