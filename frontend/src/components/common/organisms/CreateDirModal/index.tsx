import type { Props } from './type';
import { useCreateDir } from '@/hooks';
import { Button, TextField } from '@/components/common/atoms';
import { Modal } from '@/components/common/organisms';

const CreateDirModal: React.FC<Props> = ({
  isOpen, onClose
}) => {
  const { dirName, setDirName, createDir } = useCreateDir(onClose);

  return (
    <Modal
      title="ディレクトリ作成"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextField
        style={{ marginBottom: 16 }}
        placeholder="ディレクトリ名"
        value={dirName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
      />
      <Button onClick={createDir}>作成</Button>
    </Modal>
  )
}

export default CreateDirModal;