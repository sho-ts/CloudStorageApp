import { Layout } from '@/components/templates';
import { Button, Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { PostType } from '@/types/PostType';
import fetchPosts from '@/utils/fetchPosts';
import config from '@/utils/config';
import { useState, useEffect } from 'react';
import { auth } from '@/utils/aws';

const Post: NextPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();

  const onClickDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();
      const target = e.target as HTMLAnchorElement;

      if(!user || !token) throw new Error('不正なユーザー');
      if (target.href || !post) return;

      e.preventDefault();

      const res = await fetch(`${config.api}/file/download/?key=${post.file_path}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(!res.ok) throw new Error('ファイル情報の取得に失敗');

      const url = await res.text();

      target.href = url;
      target.click();
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    (async () => {
      if (router.query.id) {
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
            <Button as="a" download onClick={(e) => onClickDownload(e)}>
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