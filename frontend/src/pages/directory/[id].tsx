import type { DirType } from '@/types/DirType';
import { useRouter } from "next/router";
import useSWR from 'swr';
import { useModal, usePosts } from '@/hooks';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import { getUserLayout } from '@/utils/getLayout';
import axios from 'axios';
import { FileList } from '@/components/organisms';
import Head from 'next/head';

const Directory = () => {
  const router = useRouter();
  const [dirEditModalOpen, handleDirEditModalOpen, handleDirEditModalClose] = useModal();
  const id = router.query.id as string;
  const page = Number(router.query.page ?? 1);
  const { posts, getNextDatas, getPrevDatas } = usePosts(page, id);

  const dir = useSWR(`${config.api}/directory?id=${id}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<DirType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  });

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

Directory.getLayout = getUserLayout;

export default Directory;