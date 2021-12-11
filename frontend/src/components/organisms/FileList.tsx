import type { DirType } from '@/types/DirType';
import type { PostsType } from '@/types/PostsType';
import type { KeyedMutator } from 'swr';
import { useSelector } from '@/hooks';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { Pagination } from '@/components/molecules';
import { DirEditModal } from '@/components/organisms';
import Image from 'next/image'
import Link from 'next/link';
import settingIcon from '@imgs/common/setting-icon.svg';

type Props = {
  posts?: PostsType,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
  dir?: DirType | null,
  isModalOpen?: boolean
  handleDirEditModalOpen?: () => void,
  handleDirEditModalClose?: () => void,
  mutate?: KeyedMutator<DirType>
}

const FileList: React.FC<Props> = ({
  isModalOpen, posts, dir, page,
  handleDirEditModalOpen, handleDirEditModalClose, mutate,
  getNextDatas, getPrevDatas,
}) => {
  const { keyword } = useSelector(props => props.search);

  return (
    <>
      <Header>
        <DirInfo>
          <DirName>
            {dir ? dir.name : '全てのファイル'}
          </DirName>
          {dir && (
            <SettingIcon onClick={handleDirEditModalOpen}>
              <Image src={settingIcon} />
            </SettingIcon>
          )}
        </DirInfo>
        {keyword && (
          <Keyword>検索ワード : {keyword}</Keyword>
        )}
      </Header>
      {posts && (
        <>
          <Table>
            <Tr className="head">
              <Th>ファイル名</Th>
              <Th className="created-at">アップロード日</Th>
            </Tr>
            {posts && posts.posts.map((post, index) => (
              <Tr key={index}>
                <Link href={`/post/${post.id}`}>
                  <a>
                    <Td>{post.description}</Td>
                    <Td className="created-at">{post.created_at}</Td>
                  </a>
                </Link>
              </Tr>
            ))}
          </Table>
          <Pagination
            pages={posts?.pages}
            page={page}
            getNextDatas={getNextDatas}
            getPrevDatas={getPrevDatas}
          />
        </>
      )}
      {dir && (
        <DirEditModal
          isOpen={isModalOpen ?? false}
          onClose={handleDirEditModalClose}
          dir={dir ?? null}
          mutate={mutate}
        />
      )}
    </>
  )
}

const Header = styled.header`
  margin-bottom: 16px;
`;

const DirInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Keyword = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const Table = styled.div`
  width: 100%;
  margin-bottom: 32px;
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

export default FileList;