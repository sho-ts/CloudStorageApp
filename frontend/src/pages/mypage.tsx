import config from '@/utils/config';
import type { NextPage } from 'next'
import Head from 'next/head'
import { FileList } from '@/components/molecules';
import { Layout } from '@/components/templates';
import { PostType } from '@/types/PostType';

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/posts`);
  const posts = await res.json();
  return {
    props: { posts }
  }
}

type Props = {
  posts: PostType[]
}

const MyPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <Layout>
        <FileList posts={posts} />
      </Layout>
    </>
  )
}

export default MyPage;