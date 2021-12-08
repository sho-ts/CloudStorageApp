import type { NextPage } from 'next'
import Head from 'next/head'
import { PostType } from '@/types/PostType';
import Auth from '@/provider/AuthProvider';
import { Layout } from '@/components/templates';
import styled from 'styled-components';
import { mq, hover } from '@mixin';
import { Button, TextField } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { UploadModal } from '@/components/organisms';
import Link from 'next/link';
import { useModal, usePosts } from '@/hooks';
import useSWR from 'swr';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import axios from 'axios'

type PostsType = {
  posts: PostType[],
  pages: number,
  current: number,
}

const MyPage: NextPage = () => {
  const [modalOpen, handleModalOpen, handleModalClose] = useModal();
  const { current, data, error, inputKeyword, keyword, getNextDatas, getPrevDatas, onChangeInputKeyword } = usePosts();

  return (
    <Auth>
      <Head>
        <title>マイページ</title>
      </Head>
      <Layout>
        <Inner>
          <Main>
            <Header>
              <DirHeading>開いているディレクトリの名前</DirHeading>
            </Header>
            <FileList>
              <Table>
                <Tr className="head">
                  <Th>ファイル名</Th>
                  <Th className="created-at">アップロード日</Th>
                </Tr>
                {data && data.posts.map((post, index) => (
                  <Tr key={index}>
                    <Link href={`/posts/${post.id}`}>
                      <a>
                        <Td>{post.description}</Td>
                        <Td className="created-at">{post.created_at}</Td>
                      </a>
                    </Link>
                  </Tr>
                ))}
              </Table>
            </FileList>
            {data && <Pagination pages={data.pages} current={current} getNextDatas={getNextDatas} getPrevDatas={getPrevDatas} />}
          </Main>
          <Sidebar>
            <FileUpload>
              <Button onClick={handleModalOpen}>アップロード</Button>
            </FileUpload>
            <Search>
              <TextField value={inputKeyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInputKeyword(e)} placeholder="検索" />
            </Search>
          </Sidebar>
        </Inner>
        <UploadModal current={current} keyword={keyword} isOpen={modalOpen} onClose={handleModalClose} />
      </Layout>
    </Auth >
  )
}

const Inner = styled.div`
  ${mq()} {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 24px;
  }
`;

const Main = styled.main`
  width: 100%;
  ${mq('md', 'down')} {
    margin-bottom: 32px;
  }
`;

const Header = styled.header`
  margin-bottom: 16px;
`;

const DirHeading = styled.h2`
  font-size: 20px;
`;

const FileList = styled.div`
  margin-bottom: 32px;
`;

const Table = styled.div`
  width: 100%;
`;

const Tr = styled.div`
  ${mq()} {
    display: flex;
    width: 100%;
  }
  &.head {
    ${mq('md', 'down')} {
      display: none; // ソート機能追加後変更
    }
  }
  a {
    width: 100%;
    transition: all 0.3s;
    display: flex;
    ${mq('md', 'down')} {
      border-bottom: 1px solid #d9d9d9;
      flex-direction: column-reverse;
    }
    ${mq()} {
      width: 100%;
    }
    &:hover {
      background-color: #ededed;
    }
  }
`;

const Th = styled.div`
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #a3a3a3;
  padding: 24px;
  width: 100%;
  &.created-at {
    ${mq()} {
      width: 250px;
      flex-shrink: 0;
    }
  }
`;

const Td = styled.div`
  font-size: 14px;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 16px;
  ${mq()} {
    padding: 16px 24px;
    border-bottom: 1px solid #d9d9d9;
  };
  &.created-at {
    ${mq('md', 'down')} {
      font-size: 12px;
      padding-bottom: 0;
      opacity: 0.5;
    }
    ${mq()} {
      width: 250px;
      flex-shrink: 0;
    }
  }
`;

const Sidebar = styled.aside`
  max-width: 280px;
  flex-shrink: 0;
  margin-right: 48px;
`;

const FileUpload = styled.section`
  margin-bottom: 24px;
`;

const Search = styled.div`

`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  .pagination-button {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

export default MyPage;