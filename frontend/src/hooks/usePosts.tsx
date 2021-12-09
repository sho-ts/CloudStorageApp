import { useState } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import axios from 'axios'
import { PostsType } from '@/types/PostsType';
import { DirType } from '@/types/DirType';
import { createPagination } from '@/utils';

const usePosts = () => {
  const [page, setPage] = useState<number>(1);
  const [currentDir, setCurrentDir] = useState<DirType | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  const dirs = useSWR(`${config.api}/directory/all`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<DirType[]>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  })

  const posts = useSWR<PostsType>(`${config.api}/post/all?page=${page}&s=${keyword || ''}&dir=${currentDir ? currentDir.id : ''}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setPage(data.current);
      return data
    });
  });

  const [getNextDatas, getPrevDatas] = createPagination<PostsType>(page, setPage, posts.data);

  return {
    page,
    currentDir,
    posts,
    dirs,
    keyword,
    setKeyword,
    setCurrentDir,
    getNextDatas,
    getPrevDatas,
  }
}

export default usePosts;