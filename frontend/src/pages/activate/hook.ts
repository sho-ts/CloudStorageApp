import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFlash } from '@/hooks';
import { auth } from '@/utils/aws';
import { MESSAGE_TYPE } from '@/utils/const'

const useLogic = () => {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const flash = useFlash();

  const activateUser = async () => {
    if (!router.query.email || !code) return;

    try {
      const activated = await auth.activate(`${router.query.email}`, code);

      if (activated) {
        await router.push('/signin');
        
        flash({
          message: '認証に成功しました。ログインしてください',
          type: MESSAGE_TYPE.NOTICE
        })
      }
    } catch (e) {
      flash({
        message: '認証に失敗しました。コードを確認してください',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return { code, setCode, activateUser };
}

export default useLogic;