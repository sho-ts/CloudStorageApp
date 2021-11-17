import { Layout } from '@/components/templates';
import { Button, Box } from '@chakra-ui/react';
import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from "next/router";
import { PostType } from '@/types/PostType';
import fetchPosts from '@/utils/fetchPosts';
import config from '@/utils/config';
import { useState, useEffect } from 'react';

const Post: NextPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    (async () => {
      if(router.query.id) {
        const newPost = await fetchPosts<PostType>(Number(router.query.id));
        newPost && setPost(newPost);
      }
    })();
  }, [router.query.id])

  return (
    <Layout>
      {post ? (
        <>
          {post.description}
          <Box mt={5}>
            <Button as="a" href={`${config.api}/post/download/?key=${post.file_path}`}>
              ダウンロード
            </Button>
          </Box>
        </>
      ) : <></>
      }
    </Layout>
  )
}

export default Post;