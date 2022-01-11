import type { ApiDirType } from '@/types/ApiDirType';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSelector, useDispatch } from '@/hooks';
import { setSearchKeyword } from '@/stores/search';
import { setIsSmallWindowSize } from '@/stores/windowSize';
import axios from 'axios'
import { auth } from '@/utils/aws';
import { config } from '@/utils';

const useLogic = () => {
  const { keyword } = useSelector(state => state.search);
  const { isSmallWindowSize } = useSelector(state => state.windowSize);

  const dispatch = useDispatch();

  const checkWindowSize = () => dispatch(setIsSmallWindowSize(window.matchMedia('(max-width: 767px)').matches));

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    }
  }, []);

  const onChangeDispatchKeyword = (nextKeyword: string) => dispatch(setSearchKeyword(nextKeyword));

  const dirs = useSWR(`${config.api}/directory/all`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<ApiDirType[]>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  })

  return { keyword, isSmallWindowSize, dirs, onChangeDispatchKeyword }
}

export default useLogic;