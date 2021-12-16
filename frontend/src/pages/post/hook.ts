import type { PostType } from '@/types/PostType';
import { useMemo } from 'react';
import { useRouter } from "next/router";
import { useModal, useDir } from '@/hooks';
import useSWR from 'swr';
import { isImage, isMovie, isCompressed, isCode } from '@/utils/checkFileType';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import axios from 'axios';
import { BsCardImage, BsFillFileEarmarkCodeFill, BsFileEarmarkZipFill, BsFillFileEarmarkFill } from 'react-icons/bs'
import { BiMoviePlay } from 'react-icons/bi';

const useLogic = () => {
  const router = useRouter();

  const [fileEditModalOpen, handleFileEditModalOpen, handleFileEditModalClose] = useModal();

  const dirs = useDir();

  const post = useSWR<PostType>(`${config.api}/post/?id=${router.query.post_id}`, (url: string) => {
    const token = auth.getIdToken();

    return axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)
  });

  const Icon = useMemo(() => {
    const path = post.data?.file_path ?? '';

    return (
      isImage(path) ? { Component: BsCardImage, color: '#dc143c' } :
        isMovie(path) ? { Component: BiMoviePlay, color: '#008000' } :
          isCode(path) ? { Component: BsFillFileEarmarkCodeFill, color: '#ff8c00' } :
            isCompressed(path) ? { Component: BsFileEarmarkZipFill, color: '#888888' } :
              { Component: BsFillFileEarmarkFill, color: '#1e90ff' }
    );
  }, [post.data?.file_path]);

  const onClickDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();
      const target = e.target as HTMLAnchorElement;

      if (!user || !token) throw new Error('不正なユーザー');
      if (target.href || !post.data) return;

      e.preventDefault();

      const res = await axios.get<string>(`${config.api}/file/download/?key=${post.data.file_path}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      target.href = res.data;
      target.click();
    } catch (e) {
      console.error(e);
    }
  }

  return {
    dirs, post, Icon, onClickDownload,
    fileEditModalOpen, handleFileEditModalOpen, handleFileEditModalClose,
  }
}

export default useLogic;