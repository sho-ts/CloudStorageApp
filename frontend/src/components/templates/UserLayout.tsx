import { useSelector } from '@/hooks';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { Button, TextField } from '@/components/atoms';
import { Layout } from '@/components/templates';
import { Pagination, Directories } from '@/components/molecules';
import { Header, Footer } from '@/components/organisms';
import { CreateDirModal, UploadModal, DirEditModal } from '@/components/organisms';
import Link from 'next/link';
import { useModal, usePosts } from '@/hooks';
import settingIcon from '@imgs/common/setting-icon.svg';
import Image from 'next/image'


type Props = {
}

const UserLayout: React.FC<Props> = ({ children }) => {
  const { posts, currentDir, dirs, page, keyword, changeDir, getNextDatas, getPrevDatas, setKeyword } = usePosts();
  const [uploadModalOpen, handleUploadModalOpen, handleUploadModalClose] = useModal();
  const [dirModalOpen, handleDirModalOpen, handleDirModalClose] = useModal();
  const [dirEditModalOpen, handleDirEditModalOpen, handleDirEditModalClose] = useModal();

  return (
    <Layout>
      <Inner>
        <Main>
          {children}
        </Main>
        <Sidebar>
          <FileUpload>
            <Button onClick={handleUploadModalOpen}>アップロード</Button>
          </FileUpload>
          <Search>
            <TextField value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} placeholder="検索" />
          </Search>
          {dirs.data &&
            <Directories
              modalOpen={handleDirModalOpen}
              dirs={dirs.data}
              changeDir={changeDir}
            />
          }
        </Sidebar>
      </Inner>
      <UploadModal
        mutate={posts.mutate}
        isOpen={uploadModalOpen}
        dirs={dirs.data ?? []}
        onClose={handleUploadModalClose}
      />
      <CreateDirModal
        mutate={dirs.mutate}
        isOpen={dirModalOpen}
        onClose={handleDirModalClose}
      />
      {currentDir && (
        <DirEditModal
          changeDir={changeDir}
          dir={currentDir}
          mutate={dirs.mutate}
          isOpen={dirEditModalOpen}
          onClose={handleDirEditModalClose}
        />
      )}
    </Layout>
  )
}

const Inner = styled.div`
  ${mq()} {
    display: flex;
    flex-direction: row-reverse;
  }
  ${mq('lg')} {
    padding: 0 24px;
  }
`;

const Main = styled.main`
  width: 100%;
  ${mq('md', 'down')} {
    margin-bottom: 32px;
  }
`;

const SettingIcon = styled.button`
  flex-shrink: 0;
  width: 24px;
  margin-left: 16px;
`;

const DirName = styled.h2`
  font-size: 18px;
  font-weight: bold;
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
    ${hover(css`
      background-color: #ededed;
    `)} 
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
  flex-shrink: 0;
  ${mq()} {
    max-width: 280px;
    margin-right: 24px;
  }
  ${mq('lg')} {
    margin-right: 48px;
  }
`;

const FileUpload = styled.section`
  margin-bottom: 24px;
`;

const Search = styled.div`

`;


export default UserLayout;