import type { PostsType } from '@/types/PostsType';
import { useState } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config, createPagination } from '@/utils';
import axios from 'axios'

const usePosts = (dirId?: string) => {
  const [page, setPage] = useState<number>(1);

  const posts = useSWR<PostsType>(`${config.api}/post/all?page=${page}&dir=${dirId ?? ''}`, async (url: string) => {
    const { token } = await auth.getIdTokenAndUser();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token} ` }
    }).then(({ data }) => {
      setPage(data.current);
      return data
    });
  });

  const [getNextDatas, getPrevDatas] = createPagination<PostsType>(page, setPage, posts.data);

  return {
    page,
    posts,
    getNextDatas,
    getPrevDatas,
  }
}

export default usePosts;