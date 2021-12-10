import Head from 'next/head'
import { FileList } from '@/components/organisms';
import { PostsType } from '@/types/PostsType';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import config from '@/utils/config';
import { auth } from '@/utils/aws';
import { createPagination } from '@/utils';
import { getUserLayout } from '@/utils/getLayout';

const MyPage = () => {
  const [page, setPage] = useState<number>(1);

  const posts = useSWR<PostsType>(`${config.api}/post/all?page=${page}`, async (url: string) => {
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

  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <FileList
        dir={null}
        page={page}
        posts={posts.data}
        getNextDatas={getNextDatas}
        getPrevDatas={getPrevDatas}
      />
    </>
  )
}

MyPage.getLayout = getUserLayout;

export default MyPage;