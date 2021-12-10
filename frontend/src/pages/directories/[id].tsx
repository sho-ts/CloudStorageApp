import { useRouter } from "next/router";
import { DirType } from '@/types/DirType';
import config from '@/utils/config';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import axios from 'axios';
import { UserLayout } from '@/components/templates';
import type { ReactElement } from 'react'
import { FileList } from '@/components/organisms';
import { PostsType } from '@/types/PostsType';
import { useState } from 'react';
import { useModal } from '@/hooks';
import { createPagination } from '@/utils';
import Head from 'next/head';

const Directory = () => {
  const [page, setPage] = useState<number>(1);
  const [dirEditModalOpen, handleDirEditModalOpen, handleDirEditModalClose] = useModal();
  const router = useRouter();
  const id = router.query.id;

  const posts = useSWR<PostsType>(`${config.api}/post/all?page=${page}&dir=${id}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setPage(data.current);
      return data
    });
  });

  const dir = useSWR(`${config.api}/directory?id=${id}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<DirType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  });

  const [getNextDatas, getPrevDatas] = createPagination<PostsType>(page, setPage, posts.data);

  return (
    <>
      {dir.data && (
        <>
          <Head>
            <title>{dir.data.name}</title>
          </Head>
          <FileList
            dir={dir.data}
            page={page}
            posts={posts.data}
            mutate={dir.mutate}
            isModalOpen={dirEditModalOpen}
            getNextDatas={getNextDatas}
            getPrevDatas={getPrevDatas}
            handleDirEditModalOpen={handleDirEditModalOpen}
            handleDirEditModalClose={handleDirEditModalClose}
          />
        </>
      )}
    </>
  )
}

Directory.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}

export default Directory;