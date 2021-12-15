import type { PostsType } from '@/types/PostsType';
import { useSelector } from '@/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config, createPagination } from '@/utils';
import axios from 'axios'

const usePosts = (page: number, dirId?: string | null) => {
  const { keyword } = useSelector(props => props.search);
  const router = useRouter();
  const path = router.asPath.replace(/\?.*$/, ''); // クエリパラメータいらないので削除する

  const posts = useSWR<PostsType>(`${config.api}/post/all?page=${page}&s=${keyword}&dir=${dirId ?? ''}`, async (url: string) => {
    const { token } = await auth.getIdTokenAndUser();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token} ` }
    }).then(({ data }) => {
      return data
    });
  });

  const [getNextDatas, getPrevDatas, changePage] = createPagination<PostsType>(page, path, router, posts.data);

  return {
    posts,
    getNextDatas,
    getPrevDatas,
    changePage
  }
}

export default usePosts;