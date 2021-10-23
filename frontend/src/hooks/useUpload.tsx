import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';
import config from '@/utils/config';

const FileName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const useUpload = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone()

  const files = acceptedFiles.map((file, index) => (
    <div key={index} style={{ display: 'flex' }}>
      <FileName>{file.name}</FileName>
    </div>
  ))

  const upload = async () => {
    if (acceptedFiles.length < 1) return;
    const [file] = acceptedFiles;

    try {
      const res = await fetch(`${config.api}/post`, {
        method: 'POST',
        body: JSON.stringify({
          'description': `テスト投稿です, ${file.name}`,
          'filePath': file.name,
          'fileSize': file.size
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error('アップロードに失敗')

      console.log('アップロード成功');
    } catch (e) {
      console.error(e);
    }
  }

  return {
    getRootProps, getInputProps, upload, files
  }
}

export default useUpload;