import type { PostsType } from '@/types/PostsType';
import { useSelector } from '@/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { createAxiosInstance, createPagination, queryBuilder } from '@/utils';
import { SORT_TYPE, ORDER_BY } from '@/utils/const';

const usePosts = (page: number, dirId?: string | null) => {
  const { keyword } = useSelector(state => state.search);
  const router = useRouter();
  const sort = router.query.sort as SORT_TYPE;
  const order = router.query.order as ORDER_BY;
  const path = router.asPath.replace(/\?.*$/, ''); // クエリパラメータいらないので削除する

  const query = queryBuilder({
    page,
    s: keyword,
    dir: dirId,
    sort,
    order,
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