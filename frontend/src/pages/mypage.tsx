import { useRouter } from 'next/router';
import { usePosts } from '@/hooks';
import Head from 'next/head'
import { FileList } from '@/components/organisms';
import { getUserLayout } from '@/utils/getLayout';

const MyPage = () => {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const { posts, getNextDatas, getPrevDatas, changePage } = usePosts(page);

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
        changePage={changePage}
      />
    </>
  )
}

MyPage.getLayout = getUserLayout;

export default MyPage;