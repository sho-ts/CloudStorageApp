import { useState } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import axios from 'axios'
import { PostType } from '@/types/PostType';
import { createPagination } from '@/utils';

type PostsType = {
  posts: PostType[],
  pages: number,
  current: number,
}

const usePosts = () => {
  const [current, setCurrent] = useState<number>(1);

  const { data, error } = useSWR<PostsType>(`${config.api}/post/all?page=${current}`, (url: string) => {
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
    data,
    error,
    getNextDatas,
    getPrevDatas,
  }
}

export default usePosts;