import { List, ListItem } from '@chakra-ui/react';

type Props = {

}

const FileList: React.FC<Props> = () => {
  return (
    <List>
      <ListItem>テスト</ListItem>
      <ListItem>テスト</ListItem>
      <ListItem>テスト</ListItem>
    </List>
  )
}

export default FileList;