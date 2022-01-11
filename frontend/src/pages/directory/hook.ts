import type { ApiDirType } from '@/types/ApiDirType';
import { useRouter } from "next/router";
import useSWR from 'swr';
import { useModal, usePosts } from '@/hooks';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import axios from 'axios';

const useLogic = () => {
  const router = useRouter();
  const [dirEditModalOpen, handleDirEditModalOpen, handleDirEditModalClose] = useModal();
  const id = router.query.dir_id as string;
  const page = Number(router.query.page ?? 1);
  const { posts, getNextDatas, getPrevDatas, changePage } = usePosts(page, id);

  const dir = useSWR(`${config.api}/directory?id=${id}`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<ApiDirType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  });

  return {
    dir,
    dirEditModalOpen,
    posts,
    page,
    getNextDatas,
    getPrevDatas,
    changePage,
    handleDirEditModalOpen,
    handleDirEditModalClose,
  }
}

export default useLogic;