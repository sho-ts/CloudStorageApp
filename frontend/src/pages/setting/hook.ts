import { useMemo } from 'react';
import { useSelector } from '@/hooks';
import { PLAN_TYPE } from '@/utils/const';

const useLogic = () => {
  const user = useSelector(state => state.user);
  const userDatas = useMemo(() => {
    return [
      { heading: 'ユーザー名', value: user.name },
      { heading: 'メールアドレス', value: user.email },
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
  }, [user])

  return [userDatas];
}

export default useLogic;