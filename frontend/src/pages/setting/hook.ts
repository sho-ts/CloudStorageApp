import { useMemo } from 'react';
import { useSelector } from '@/hooks';
import { PLAN_TYPE } from '@/utils/const';

const useLogic = () => {
  const user = useSelector(state => state.user);
  const isGuest = useMemo(() => user.email === `__guest__${process.env.NEXT_PUBLIC_GUEST_KEY}`, [user]);
  const userDatas = useMemo(() => {
    const datas = [
      { heading: 'ユーザー名', value: user.name },
      {
        heading: '現在のプラン',
        value: (() => {
          switch (user.plan) {
            case PLAN_TYPE.FREE:
              return '無料';
            case PLAN_TYPE.PREMIUM:
              return 'プレミアム';
            default:
              return '無料'
          }
        })()
      },
      { heading: 'ストレージ', value: user.storage }
    ]

    isGuest || datas.splice(0, 0, { heading: 'メールアドレス', value: user.email },)

    return datas
  }, [user, isGuest])

  return {
    userDatas,
    isGuest
  };
}

export default useLogic;