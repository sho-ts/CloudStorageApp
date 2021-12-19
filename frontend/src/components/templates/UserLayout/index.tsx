import type { Props } from './type';
import useLogic from './hook';
import { useModal } from '@/hooks';
import styled from 'styled-components';
import { mq } from '@mixin';
import { FlashMessage } from '@/components/atoms';
import { BottomNav } from '@/components/molecules';
import { CreateDirModal, UploadModal, Sidebar } from '@/components/organisms';
import { Layout } from '@/components/templates';

const UserLayout: React.FC<Props> = ({ children, ignoreMainLayout }) => {
  const { keyword, isSmallWindowSize, dirs, onChangeDispatchKeyword } = useLogic();
  const [uploadModalOpen, handleUploadModalOpen, handleUploadModalClose] = useModal();
  const [dirModalOpen, handleDirModalOpen, handleDirModalClose] = useModal();

  return (
    <Layout>
      {ignoreMainLayout ? (
        <>{children}</>
      ) : (
        <>
          <FlashMessage />
          <Inner>
            <Main>
              {children}
            </Main>
            {isSmallWindowSize || (
              <Sidebar
                handleDirModalOpen={handleDirModalOpen}
                handleUploadModalOpen={handleUploadModalOpen}
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