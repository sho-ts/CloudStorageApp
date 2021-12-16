import type { DirType } from '@/types/DirType';
import type { PostsType } from '@/types/PostsType';
import type { KeyedMutator } from 'swr';
import { useSelector } from '@/hooks';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { ItemTitle } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { DirEditModal } from '@/components/organisms';
import { isImage, isMovie, isCompressed, isCode } from '@/utils/checkFileType';
import Image from 'next/image'
import Link from 'next/link';
import settingIcon from '@imgs/common/setting-icon.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCardImage, BsFillFileEarmarkCodeFill, BsFileEarmarkZipFill, BsFillFileEarmarkFill } from 'react-icons/bs'
import { BiMoviePlay } from 'react-icons/bi';

type Props = {
  posts?: PostsType,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
  changePage: (page: number) => void,
  dir?: DirType | null,
  isModalOpen?: boolean
  handleDirEditModalOpen?: () => void,
  handleDirEditModalClose?: () => void,
  mutate?: KeyedMutator<DirType>
}

const FileList: React.FC<Props> = ({
  isModalOpen, posts, dir, page,
  handleDirEditModalOpen, handleDirEditModalClose, mutate,
  getNextDatas, getPrevDatas, changePage
}) => {
  const { keyword } = useSelector(props => props.search);

  return (
    <>
      <Header>
        <ItemTitle data={dir} onClick={handleDirEditModalOpen}>
          {dir ? dir.name : '全てのファイル'}
        </ItemTitle>
        {keyword && (
          <Search>
            <AiOutlineSearch size="14" />
            <Keyword>検索ワード : {keyword}</Keyword>
          </Search>
        )}
      </Header>
      {posts && (
        <>
          <Table>
            <Tr className="head">
              <Th>ファイル名</Th>
              <Th className="created-at">アップロード日</Th>
            </Tr>
            {posts.posts.length > 0 ? posts.posts.map((post, index) => (
              <Tr key={index}>
                <Link href={`/post/${post.id}`}>
                  <a>
                    <Td className="fileName">
                      <FileIcon>
                        {isImage(post.file_path) ? (
                          <BsCardImage color="#dc143c" />
                        ) : isMovie(post.file_path) ? (
                          <BiMoviePlay color="#008000" />
                        ) : isCode(post.file_path) ? (
                          <BsFillFileEarmarkCodeFill color="#ff8c00" />
                        ) : isCompressed(post.file_path) ? (
                          <BsFileEarmarkZipFill color="#888888" />
                        ) :
                          <BsFillFileEarmarkFill color="#1e90ff" />}
                      </FileIcon>
                      <span>{post.description}</span>
                    </Td>
                    <Td className="created-at">{post.created_at}</Td>
                  </a>
                </Link>
              </Tr>
            )) : <div style={{ padding: 16 }}>{keyword ? 'ファイルが見つかりませんでした' : 'まだファイルはありません'}</div>
            }
          </Table>
          <Pagination
            pages={posts?.pages}
            page={page}
            getNextDatas={getNextDatas}
            getPrevDatas={getPrevDatas}
            changePage={changePage}
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
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  height: 45px;
`;

const SettingIcon = styled.button`
  flex-shrink: 0;
  width: 24px;
  margin-left: 16px;
`;

const DirName = styled.h2`
  font-size: 20px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Keyword = styled.div`
  font-size: 12px;
  margin-left: 4px;
`;

const FileIcon = styled.div`
  margin-right: 0.8em;
  font-size: 1.2em;
  ${mq()} {
    margin-right: 1em;
    font-size: 1.6em;
  }
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
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #a3a3a3;
  padding: 16px;
  width: 100%;
  &.created-at {
    ${mq()} {
      width: 250px;
      flex-shrink: 0;
    }
  }
`;

const Td = styled.div`
  font-size: 12px;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 16px;
  word-break: break-all;
  ${mq()} {
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
  };
  ${mq('md', 'down')} {
    font-size: 13px;
  }
  &.fileName {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  &.created-at {
    ${mq('md', 'down')} {
      padding-bottom: 0;
      font-size: 11px;
      opacity: 0.5;
    }
    ${mq()} {
      width: 250px;
      flex-shrink: 0;
    }
  }
`;

export default FileList;