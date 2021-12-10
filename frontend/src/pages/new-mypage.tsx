import type { NextPage } from 'next'
import Head from 'next/head'
import Auth from '@/provider/AuthProvider';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { Button, TextField } from '@/components/atoms';
import { Pagination, Directories } from '@/components/molecules';
import { CreateDirModal, UploadModal, DirEditModal, FileList } from '@/components/organisms';
import { Layout, UserLayout } from '@/components/templates';
import Link from 'next/link';
import { useModal, usePosts } from '@/hooks';
import settingIcon from '@imgs/common/setting-icon.svg';
import Image from 'next/image'
import type { ReactElement } from 'react'

const MyPage = () => {
  const [uploadModalOpen, handleUploadModalOpen, handleUploadModalClose] = useModal();
  const [dirModalOpen, handleDirModalOpen, handleDirModalClose] = useModal();
  const [dirEditModalOpen, handleDirEditModalOpen, handleDirEditModalClose] = useModal();
  const { posts, currentDir, dirs, page, keyword, changeDir, getNextDatas, getPrevDatas, setKeyword } = usePosts();

  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <FileList
        currentDir={currentDir}
        posts={posts.data}
        page={page}
        getNextDatas={getNextDatas}
        getPrevDatas={getPrevDatas}
        handleDirEditModalOpen={handleDirEditModalOpen}
      />
    </>
  )
}

MyPage.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}

export default MyPage;