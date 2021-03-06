import { Props } from './type';
import { useUpload, useSelector } from '@/hooks';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { Button, TextField, Select } from '@/components/common/atoms';
import { Modal } from '@/components/common/organisms';

const UploadModal: React.FC<Props> = ({ dirs, isOpen, onClose }) => {
  const {
    getRootProps, getInputProps, upload,
    file, fileName, disclosureRange, uploadDir,
    setFileName, setDisclosureRange, setUploadDir,
  } = useUpload(onClose);
  const { isSmallWindowSize } = useSelector(state => state.windowSize);

  return (
    <Modal
      title="新規アップロード"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Body>
        {file ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <TextField placeholder="ファイル名" style={{ marginBottom: 16 }} value={fileName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)} />
              <Select
                style={{ marginBottom: 16 }}
                value={`${uploadDir || ''}`}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setUploadDir(Number(e.target.value)) }}
              >
                <option value="">ディレクトリなし</option>
                {dirs.map(dir => <option key={dir.id} value={`${dir.id}`}>{dir.name}</option>)}
              </Select>
              <Select
                style={{ marginBottom: 16 }}
                value={String(disclosureRange)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setDisclosureRange(Number(e.target.value)) }}
              >
                <option value="0">公開</option>
                <option value="1">非公開</option>
              </Select>
              <Text>{Math.ceil(file.size / 1024)}KB</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => upload()}>アップロード</Button>
            </div>
          </>
        ) : (
          <DropWrapper>
            <DropArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Text>{isSmallWindowSize ? 'ファイルを選択' : 'ドラッグ&ドロップでアップロード'}</Text>
            </DropArea>
          </DropWrapper>
        )}
      </Body>
    </Modal>
  )
}

const Body = styled.div`
  position: relative;
  ${mq()} {
    padding: 32px;
  }
`

const DropArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 2px dotted #000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  ${hover(css`
    background-color: #eee;
  `)}
`

const DropWrapper = styled.div`
  position: relative;
  padding-top: 50%;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`

export default UploadModal;