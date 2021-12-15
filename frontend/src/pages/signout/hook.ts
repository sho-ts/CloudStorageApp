import { useRouter } from 'next/router';
import { useDispatch, useFlash } from '@/hooks';
import { signOut } from '@/stores/user/asyncThunk';
import { MESSAGE_TYPE } from '@/utils/const'

const useLogic = () => {
  const router = useRouter();
  const flash = useFlash();
  const dispatch = useDispatch();

  const onClickSignout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      router.push('/');
    } catch (e) {
      flash({
        message: (e as { errorMessage: string }).errorMessage,
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return { onClickSignout }
}

export default useLogic;