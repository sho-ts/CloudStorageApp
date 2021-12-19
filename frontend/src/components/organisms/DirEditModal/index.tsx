import type { Props } from './type';
import useLogic from './hook';
import styled from 'styled-components';
import { Button, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';

const DirEditModal: React.FC<Props> = ({
  isOpen, onClose, dir, mutate,
}) => {
  const { dirName, setDirName, editDir, deleteDir } = useLogic(onClose, dir, mutate);
  return (
    <Modal
      title="ディレクトリ編集"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextField
        style={{ marginBottom: 16 }}
        placeholder="ディレクトリ名"
        value={dirName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
      />
      <div>
        <Box>
          <Button onClick={editDir}>編集</Button>
        </Box>
        <Box>
          <Button onClick={deleteDir}>削除</Button>
        </Box>
      </div>
    </Modal>
  )
}

const Box = styled.div`
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 32px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 32px;
  }
`;

export default DirEditModal;