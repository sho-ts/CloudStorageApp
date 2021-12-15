import { useRouter } from 'next/router';
import { usePosts } from '@/hooks';

const useLogic = () => {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const { posts, getNextDatas, getPrevDatas, changePage } = usePosts(page);

  return { page, posts, getNextDatas, getPrevDatas, changePage, }
}

export default useLogic;