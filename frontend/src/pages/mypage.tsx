import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { FileList } from '@/components/molecules';
import { Layout } from '@/components/templates';
import { PostType } from '@/types/PostType';
import fetchPosts from '@/utils/fetchPosts';
import Auth from '@/provider/AuthProvider';
import { auth } from '@/utils/aws';
import { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';

const MyPage: NextPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  const getNextPosts = async () => {
    const next = current + 1

    if (pages < next) return;

    const newPosts = await fetchPosts(next);

    if (newPosts) {
      setPosts(newPosts.posts);
      setPages(newPosts.pages);
      setCurrent(newPosts.current);
    }
  }

  const getPrevPosts = async () => {
    const prev = current - 1;

    if (1 > prev) return;

    const newPosts = await fetchPosts(prev);

    if (newPosts) {
      setPosts(newPosts.posts);
      setPages(newPosts.pages);
      setCurrent(newPosts.current);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await auth.getUser();
      const idToken = auth.getIdToken();
      console.log(idToken);

      const newPosts = await fetchPosts();

      if (newPosts) {
        setPosts(newPosts.posts);
        setPages(newPosts.pages);
        setCurrent(newPosts.current);
      }
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
        <Flex mt={4} justify="center">
          {1 > current - 1 || <Button mr={4} onClick={getPrevPosts}>前</Button>}
          {pages < current + 1 || <Button onClick={getNextPosts}>次</Button>}
        </Flex>
      </Layout>
    </Auth>
  )
}

export default MyPage;