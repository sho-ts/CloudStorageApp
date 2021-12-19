import { useEffect } from 'react';
import { useModal } from '@/hooks';

const useLogic = () => {
  const [listOpen, handleListOpen, handleListClose] = useModal();
  const onClickClose = (e: any) => !e.target.classList.contains('PaginationNumbersElement') && handleListClose();

  useEffect(() => {
    window.addEventListener('click', onClickClose);

    return () => {
      window.removeEventListener('click', onClickClose);
    }
  }, [])

  return { listOpen, handleListOpen, handleListClose };
}

export default useLogic;