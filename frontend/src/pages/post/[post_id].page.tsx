import useLogic from './hook'
import styled, { css } from 'styled-components';
import { mq } from '@mixin';
import { Button, ItemTitle } from '@/components/atoms'
import { FileEditModal } from '@/components/organisms';
import Head from 'next/head';
import { getFileExtension } from '@/utils';
import { withUserLayout } from '@layout';

const Post = () => {
  const {
    dirs, post, Icon, onClickDownload,
    fileEditModalOpen, handleFileEditModalOpen, handleFileEditModalClose,
  } = useLogic();

  return (
    <>
      {post.data && (
        <>
          <Head>
            <title>{post.data.description}</title>
          </Head>
          <ItemTitle
            style={{ marginBottom: 24 }}
            Icon={Icon.Component}
            IconColor={Icon.color}
            onClick={handleFileEditModalOpen}
            data={post.data}
          >
            {post.data.description}
          </ItemTitle>
          <Table style={{ marginBottom: 24 }}>
            <Tbody>
              <Tr>
                <Th>アップロード日</Th>
                <Td>{post.data.created_at}</Td>
              </Tr>
              <Tr>
                <Th>編集日</Th>
                <Td>{post.data.updated_at}</Td>
              </Tr>
              <Tr>
                <Th>ファイルサイズ</Th>
                <Td>{post.data.file_size}</Td>
              </Tr>
              <Tr>
                <Th>ファイル拡張子</Th>
                <Td>{getFileExtension(post.data.file_path)}</Td>
              </Tr>
            </Tbody>
          </Table>
          <div style={{ textAlign: 'center' }}>
            <Button as="a" target="_blank" download onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClickDownload(e)}>
              ダウンロード
            </Button>
          </div>
          <FileEditModal
            isOpen={fileEditModalOpen}
            post={post.data}
            onClose={handleFileEditModalClose}
            dirs={dirs.data}
          />
        </>
      )}
      {post.error && <p>データがありません</p>}
    </>
  )
}

const SmallWindowStyle = css`
  ${mq('md', 'down')} {
    display: block;
    width: 100%;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  ${SmallWindowStyle}
`;

const Tbody = styled.tbody`
  ${SmallWindowStyle}
`;

const Tr = styled.tr`
  border: 1px solid #ddd;
  ${SmallWindowStyle}
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 16px;
  width: 250px;
  ${SmallWindowStyle}
`;

const Td = styled.td`
  padding: 16px;
  ${SmallWindowStyle}
`;

export default withUserLayout(Post);