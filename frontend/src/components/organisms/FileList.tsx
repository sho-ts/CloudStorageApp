import type { DirType } from '@/types/DirType';
import type { PostsType } from '@/types/PostsType';
import type { KeyedMutator } from 'swr';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
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

const FileList: React.FC<Props> = ({ isModalOpen, posts, dir, handleDirEditModalOpen, handleDirEditModalClose, mutate }) => {
  return (
    <>
      <Wrapper>
        <Header>
          <DirName>
            {dir ? dir.name : '全てのファイル'}
          </DirName>
          {dir && (
            <SettingIcon onClick={handleDirEditModalOpen}>
              <Image src={settingIcon} />
            </SettingIcon>
          )}
        </Header>
        <Table>
          <Tr className="head">
            <Th>ファイル名</Th>
            <Th className="created-at">アップロード日</Th>
          </Tr>
          {posts && posts.posts.map((post, index) => (
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
      </Wrapper>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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


const Wrapper = styled.div`
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

export default FileList;