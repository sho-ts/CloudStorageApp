import { useState } from 'react';
import { useDispatch } from '@/hooks';
import { setSearchKeyword } from '@/stores/search';

const useLogic = (onClose: any) => {
  const [keyword, setKeyword] = useState<string>('');
  const dispatch = useDispatch();

  const onClickSearch = () => {
    dispatch(setSearchKeyword(keyword));
    onClose();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return { keyword, setKeyword, onClickSearch }
}

export default useLogic;