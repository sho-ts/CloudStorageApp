import type { ApiDirType } from '@common/types/ApiDirType';
import { useRouter } from 'next/router';
import { useCreateDir } from '@/hooks';
import styled from 'styled-components';
import { Select, TextField, Button } from '@/components/common/atoms';
import { Modal } from '@/components/common/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
  dirs?: ApiDirType[]
}

const DirsModal: React.FC<Props> = ({
  isOpen, onClose, dirs
}) => {
  const router = useRouter();
  const changeDir = (id: string) => {
    onClose();
    id ? router.push(`/directory/${id}`) : router.push('/mypage');
  }
  const { dirName, setDirName, createDir } = useCreateDir();

  return (
    <Modal
      title="ディレクトリ"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div style={{ marginBottom: 24 }}>
        <SubTitle>ディレクトリ切り替え</SubTitle>
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeDir(e.target.value)}
        >
          <option value="">すべて</option>
          {dirs && dirs.map(dir => <option key={dir.id} value={dir.id}>{dir.name}</option>)}
        </Select>
      </div>
      <div>
        <SubTitle>新規作成</SubTitle>
        <TextField
          style={{ marginBottom: 16 }}
          placeholder="ディレクトリ名"
          value={dirName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
        />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={createDir}>作成</Button>
        </div>
      </div>
    </Modal>
  )
}

const SubTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
`


export default DirsModal;