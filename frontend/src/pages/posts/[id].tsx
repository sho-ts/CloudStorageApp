import { Layout } from '@/components/templates';
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { PostType } from '@/types/PostType';
import config from '@/utils/config';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { Button } from '@/components/atoms'
import axios from 'axios';

const Post: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR<PostType>(`${config.api}/post/?id=${router.query.id}`, (url: string) => {
    const token = auth.getIdToken();

    return axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)
  });


  const onClickDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();
      const target = e.target as HTMLAnchorElement;

      if (!user || !token) throw new Error('不正なユーザー');
      if (target.href || !data) return;

      e.preventDefault();

      const res = await axios.get<string>(`${config.api}/file/download/?key=${data.file_path}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      target.href = res.data;
      target.click();
    } catch (e) {
      console.error(e);
    }
  }



  return (
    <Layout>
      {data && (
        <>
          {data.description}
          <div style={{ marginTop: 16 }}>
            <Button as="a" download onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClickDownload(e)}>
              ダウンロード
            </Button>
          </div>
        </>
      )}
      {error && <p>データがありません</p>}
    </Layout>
  )
}

export default Post;