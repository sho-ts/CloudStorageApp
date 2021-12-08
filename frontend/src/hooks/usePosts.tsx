import { useState } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import axios from 'axios'
import { PostsType } from '@/types/PostsType';
import { createPagination } from '@/utils';

const usePosts = () => {
  const [current, setCurrent] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');

  const onChangeInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { data, error, mutate } = useSWR<PostsType>(`${config.api}/post/all?page=${current}&s=${keyword}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setCurrent(data.current);
      return data
    });
  });

  const [getNextDatas, getPrevDatas] = createPagination<PostsType>(current, setCurrent, data);

  return {
    current,
    postData: data,
    postError: error,
    keyword,
    mutate,
    onChangeInputKeyword,
    getNextDatas,
    getPrevDatas,
  }
}

export default usePosts;