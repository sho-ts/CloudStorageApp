import { Layout } from '@/components/templates';
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { PostType } from '@/types/PostType';
import fetchPost from '@/utils/fetchPost';
import config from '@/utils/config';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { Button } from '@/components/atoms'
import styled from 'styled-components';

const Post: NextPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();

  const onClickDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();
      const target = e.target as HTMLAnchorElement;

      if (!user || !token) throw new Error('不正なユーザー');
      if (target.href || !post) return;

      e.preventDefault();

      const res = await fetch(`${config.api}/file/download/?key=${post.file_path}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('ファイル情報の取得に失敗');

      const url = await res.text();

      target.href = url;
      target.click();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const newPost = await fetchPost<PostType>(Number(router.query.id));
        newPost && setPost(newPost);
      }
    })();
  }, [router.query.id])

  return (
    <Layout>
      {post && (
        <>
          {post.description}
          <div style={{ marginTop: 16 }}>
            <Button as="a" download onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClickDownload(e)}>
              ダウンロード
            </Button>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Post;