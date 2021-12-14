import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFlash } from '@/hooks';
import { auth } from '@/utils/aws'
import { MESSAGE_TYPE } from '@/utils/const'

const useSignUp = () => {
  const router = useRouter();
  const flash = useFlash();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      await auth.signup(email, password);
      flash({
        message: '認証コードをメールアドレスに送信しました',
        type: MESSAGE_TYPE.NOTICE
      })
      router.push(`/activate?email=${email}`);
    } catch (e) {
      flash({
        message: '新規登録に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
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