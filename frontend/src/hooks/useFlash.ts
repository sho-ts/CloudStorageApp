import { useDispatch } from '@/hooks';
import { setFlash } from '@/stores/flash';
import { MESSAGE_TYPE } from '@/utils/const'

const useFlash = () => {
  const dispatch = useDispatch();

  return (payload: {
    message: string,
    type: MESSAGE_TYPE
  }) => {
    dispatch(setFlash({
      message: payload.message,
      type: payload.type
    }));
  }
}

export default useFlash;