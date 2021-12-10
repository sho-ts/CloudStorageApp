import { usePosts } from '@/hooks';
import Head from 'next/head'
import { FileList } from '@/components/organisms';
import { getUserLayout } from '@/utils/getLayout';

const MyPage = () => {
  const {page, posts,getNextDatas, getPrevDatas} = usePosts();

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