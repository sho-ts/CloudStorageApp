import useLogic from './hook';
import Head from 'next/head'
import { FileList } from '@/components/common/organisms';
import { withUserLayout } from '@layout';

const MyPage = () => {
  const { page, posts, getNextDatas, getPrevDatas, changePage } = useLogic();

  return (
    <FileList
      dir={null}
      page={page}
      posts={posts.data}
      getNextDatas={getNextDatas}
      getPrevDatas={getPrevDatas}
      changePage={changePage}
    />
  )
}

export default withUserLayout(MyPage, 'マイページ');