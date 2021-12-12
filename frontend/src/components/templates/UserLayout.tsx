import type { DirType } from '@/types/DirType';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useModal, useSelector, useDispatch } from '@/hooks';
import { setSearchKeyword } from '@/stores/search';
import { setIsSmallWindowSize } from '@/stores/windowSize';
import axios from 'axios'
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import styled from 'styled-components';
import { mq } from '@mixin';
import { BottomNav } from '@/components/molecules';
import { CreateDirModal, UploadModal, Sidebar } from '@/components/organisms';
import { Layout } from '@/components/templates';

type Props = {
  ignoreMainLayout?: boolean
}

const UserLayout: React.FC<Props> = ({ children, ignoreMainLayout }) => {
  const { keyword } = useSelector(props => props.search);
  const { isSmallWindowSize } = useSelector(props => props.windowSize);

  const dispatch = useDispatch();

  const checkWindowSize = () => dispatch(setIsSmallWindowSize(window.matchMedia('(max-width: 767px)').matches));

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    }
  }, []);

  const onChangeDispatchKeyword = (nextKeyword: string) => dispatch(setSearchKeyword(nextKeyword));

  const dirs = useSWR(`${config.api}/directory/all`, async (url: string) => {
    await auth.getUser();
    const token = auth.getIdToken();

    return axios.get<DirType[]>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data
    });
  })

  const [uploadModalOpen, handleUploadModalOpen, handleUploadModalClose] = useModal();
  const [dirModalOpen, handleDirModalOpen, handleDirModalClose] = useModal();

  return (
    <Layout>
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
            mutate={dirs.mutate}
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