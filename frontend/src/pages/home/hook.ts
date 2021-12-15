import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/utils/aws';

const useLogic = () => {
  const router = useRouter();

  const onClickStart = useCallback(async () => {
    const user = await auth.getUser();
    router.push(user ? '/mypage' : '/signup');
  }, [router])

  return { onClickStart };
}

export default useLogic;