import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import { hidden } from '@/stores/flash';

const useLogic = () => {
  const dispatch = useDispatch();
  const flash = useSelector(props => props.flash);

  useEffect(() => {
    (async () => {
      if (!flash.active) return;

      await new Promise<void>(resolve => setTimeout(resolve, 5000));
      dispatch(hidden());
    })();
  }, [flash.active]);

  const close = () => dispatch(hidden());

  return { flash, close }
}

export default useLogic;