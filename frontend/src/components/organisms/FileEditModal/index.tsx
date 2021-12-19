import { Props } from './type';
import useLogic from './hook';
import styled from 'styled-components';
import { DISCLOSURE_TYPE } from '@const';
import { Select, TextField, Button, SubTitle } from '@/components/atoms';
import { Modal } from '@/components/organisms';

const FileEditModal: React.FC<Props> = ({
  isOpen, onClose, post, dirs
}) => {
  const { fileName, setFileName, dirId, disclosureRange, setDisclosureRange, setDirId, update } = useLogic(post, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ファイル編集"
    >
      <Box>
        <SubTitle>ファイル名変更</SubTitle>
        <TextField
          value={fileName}
          placeholder="ファイル名"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
        />
      </Box>
      <Box>
        <SubTitle>ディレクトリ移動</SubTitle>
        <Select
          value={dirId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDirId(e.target.value)}
        >
          <option value="">すべて</option>
          {dirs && dirs.map(dir => <option key={dir.id} value={dir.id}>{dir.name}</option>)}
        </Select>
      </Box>
      <Box>
        <SubTitle>公開設定</SubTitle>
        <Select
          value={`${disclosureRange}`}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDisclosureRange(Number(e.target.value))}
        >
          <option value={DISCLOSURE_TYPE.PUBLIC}>公開</option>
          <option value={DISCLOSURE_TYPE.PRIVATE}>非公開</option>
        </Select>
      </Box>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={update}>編集</Button>
      </div>
    </Modal>
  )
}

const Box = styled.div`
  margin-bottom: 16px;
`;

export default FileEditModal;