import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch, useFlash } from '@/hooks';
import { changeUserData } from '@/stores/user/asyncThunk';
import { MESSAGE_TYPE } from '@/utils/const'

const useLogic = () => {
  const flash = useFlash();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (user.email === '__guest__') {
      router.push('/setting');
      flash({
        message: 'ゲストユーザーはプロフィールを編集できません',
        type: MESSAGE_TYPE.ERROR
      })
    }

    setName(user.name);
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    }
  }, [user, router, flash]);

  const save = async () => {
    if (!name) {
      flash({
        message: '未入力の項目があります',
        type: MESSAGE_TYPE.ERROR
      })
      return;
    }

    try {
      await dispatch(changeUserData({ name })).unwrap();
      flash({
        message: 'ユーザー情報を更新しました',
        type: MESSAGE_TYPE.NOTICE
      })

      router.push('/setting');
    } catch (e) {
      flash({
        message: (e as { errorMessage: string }).errorMessage,
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return {
    isMounted, name, setName, save
  }
}

export default useLogic;