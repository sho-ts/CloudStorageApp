import {
  Table, Thead, Tbody,
  Tr, Th, Td,
} from "@chakra-ui/react"
import { PostType } from '@/types/PostType';

type Props = {
  posts: PostType[]
}

const FileList: React.FC<Props> = ({ posts }) => {
  return (
    <Table>
      <Thead backgroundColor="gray.100">
        <Tr>
          <Th>アップロード日</Th>
          <Th>ファイル名</Th>
          <Th>容量</Th>
        </Tr>
      </Thead>
      <Tbody>
        {posts && posts.map((post, index) => (
          <Tr key={index}>
            <Td>2020/1/1</Td>
            <Td>{post.content}</Td>
            <Td>0kb</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default FileList;