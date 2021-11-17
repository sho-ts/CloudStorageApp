import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { FileList } from '@/components/molecules';
import { Layout } from '@/components/templates';
import { PostType } from '@/types/PostType';
import fetchPosts from '@/utils/fetchPosts';
import Auth from '@/provider/AuthProvider';
import { useState, useEffect } from 'react';

const MyPage: NextPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    
    (async () => {
      const newPosts = await fetchPosts<PostType[]>();
      newPosts && setPosts(newPosts);
    })();

  }, [])

  return (
    <Auth>
      <Head>
        <title>マイページ</title>
      </Head>
      <Layout>
        <PageTitle>マイページ</PageTitle>
        <FileList posts={posts} />
      </Layout>
    </Auth>
  )
}

export default MyPage;