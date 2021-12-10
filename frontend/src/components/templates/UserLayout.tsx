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
import { Button, TextField } from '@/components/atoms';
import { DirType } from '@/types/DirType';
import { Directories, BottomNav } from '@/components/molecules';
import { CreateDirModal, UploadModal } from '@/components/organisms';
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
              <Sidebar>
                <FileUpload>
                  <Button onClick={handleUploadModalOpen}>アップロード</Button>
                </FileUpload>
                <Search>
                  <TextField placeholder="検索" value={keyword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDispatchKeyword(e.target.value)} />
                </Search>
                {dirs.data &&
                  <Directories
                    modalOpen={handleDirModalOpen}
                    dirs={dirs.data}
                  />
                }
              </Sidebar>
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
          <BottomNav />
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