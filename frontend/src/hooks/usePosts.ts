import type { PostsType } from '@/types/PostsType';
import { useSelector } from '@/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { createAxiosInstance, createPagination, queryBuilder } from '@/utils';

const usePosts = (page: number, dirId?: string | null) => {
  const { keyword } = useSelector(props => props.search);
  const router = useRouter();
  const path = router.asPath.replace(/\?.*$/, ''); // クエリパラメータいらないので削除する

  const query = queryBuilder({
    page,
    s: keyword,
    dir: dirId
  })

  const posts = useSWR<PostsType>(`/post/all?${query}`, async (url: string) => {
    const axiosInstance = await createAxiosInstance();

    return axiosInstance.get<PostsType>(url).then(({ data }) => data);
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