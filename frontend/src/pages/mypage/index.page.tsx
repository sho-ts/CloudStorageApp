import useLogic from './hook';
import Head from 'next/head'
import { FileList } from '@/components/organisms';
import { getUserLayout } from '@/utils/getLayout';

const MyPage = () => {
  const { page, posts, getNextDatas, getPrevDatas, changePage } = useLogic();

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