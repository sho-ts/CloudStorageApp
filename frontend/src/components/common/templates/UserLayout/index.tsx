import type { Props } from './type';
import useLogic from './hook';
import { useModal } from '@/hooks';
import styled from 'styled-components';
import { mq } from '@mixin';
import { FlashMessage } from '@/components/common/atoms';
import { BottomNav } from '@/components/common/molecules';
import { CreateDirModal, UploadModal, SearchOptionModal, Sidebar } from '@/components/common/organisms';
import { Layout } from '@/components/common/templates';

const UserLayout: React.FC<Props> = ({ children, ignoreMainLayout }) => {
  const { keyword, isSmallWindowSize, dirs, onChangeDispatchKeyword } = useLogic();
  const [uploadModalOpen, handleUploadModalOpen, handleUploadModalClose] = useModal();
  const [dirModalOpen, handleDirModalOpen, handleDirModalClose] = useModal();
  const [searchOptionModalOpen, handleSearchOptionModalOpen, handleSearchOptionModalClose] = useModal();

  return (
    <Layout>
      <FlashMessage />
      {ignoreMainLayout ? (
        <>{children}</>
      ) : (
        <>
          <Inner>
            <Main>
              {children}
            </Main>
            {isSmallWindowSize || (
              <Sidebar
                handleDirModalOpen={handleDirModalOpen}
                handleUploadModalOpen={handleUploadModalOpen}
                handleSearchOptionModalOpen={handleSearchOptionModalOpen}
                keyword={keyword}
                dirs={dirs.data}
                onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDispatchKeyword(e.target.value)}
              />
            )}
          </Inner>
          <UploadModal
            isOpen={uploadModalOpen}
            dirs={dirs.data ?? []}
            onClose={handleUploadModalClose}
          />
          <SearchOptionModal
            isOpen={searchOptionModalOpen}
            onClose={handleSearchOptionModalClose}
          />
          <CreateDirModal
            isOpen={dirModalOpen}
            onClose={handleDirModalClose}
          />
          <BottomNav dirs={dirs.data} uploadModalOpen={handleUploadModalOpen} />
        </>
      )}
    </Layout>
  )
}

const Inner = styled.div`
  padding: 0 16px;
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

export default UserLayout;