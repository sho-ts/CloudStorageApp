import useLogic from './hook';
import { getUserLayout } from '@/utils/getLayout';
import { FileList } from '@/components/organisms';
import Head from 'next/head';

const Directory = () => {
  const {
    dir, dirEditModalOpen, posts, page,
    getNextDatas, getPrevDatas, changePage,
    handleDirEditModalOpen, handleDirEditModalClose,
  } = useLogic();

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
            changePage={changePage}
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