import type { PostType } from '@/types/PostType';
import { useMemo } from 'react';
import { useRouter } from "next/router";
import useSWR from 'swr';
import { isImage, isMovie, isCompressed, isCode } from '@/utils/checkFileType';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import axios from 'axios';
import { BsCardImage, BsFillFileEarmarkCodeFill, BsFileEarmarkZipFill, BsFillFileEarmarkFill } from 'react-icons/bs'
import { BiMoviePlay } from 'react-icons/bi';

const useLogic = () => {
  const router = useRouter();

  const { data, error } = useSWR<PostType>(`${config.api}/post/?id=${router.query.post_id}`, (url: string) => {
    const token = auth.getIdToken();

    return axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)
  });

  const Icon = useMemo(() => {
    const path = data?.file_path ?? '';

    return (
      isImage(path) ? { Component: BsCardImage, color: '#dc143c' } :
        isMovie(path) ? { Component: BiMoviePlay, color: '#008000' } :
          isCode(path) ? { Component: BsFillFileEarmarkCodeFill, color: '#ff8c00' } :
            isCompressed(path) ? { Component: BsFileEarmarkZipFill, color: '#888888' } :
              { Component: BsFillFileEarmarkFill, color: '#1e90ff' }
    );
  }, [data?.file_path]);

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

  return { data, error, Icon, onClickDownload }
}

export default useLogic;