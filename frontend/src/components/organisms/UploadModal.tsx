import { useUpload } from '@/hooks';
import type { DirType } from '@/types/DirType';
import styled from 'styled-components';
import { Button, TextField, Select } from '@/components/atoms';
import { Modal } from '@/components/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
  dirs: DirType[],
  // mutate: KeyedMutator<PostsType>,
}

const UploadModal: React.FC<Props> = ({ dirs, isOpen, onClose }) => {
  const {
    getRootProps, getInputProps, upload,
    file, fileName, disclosureRange, uploadDir,
    setFileName, setDisclosureRange, setUploadDir,
  } = useUpload(dirs, onClose);

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
              <Button onClick={() => upload()}>このファイルをアップロード</Button>
            </div>
          </>
        ) : (
          <DropWrapper>
            <DropArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Text>ここにファイルをアップロード</Text>
            </DropArea>
          </DropWrapper>
        )}
      </Body>
    </Modal>
  )
}

const Body = styled.div`
  position: relative;
  padding: 64px 32px;
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