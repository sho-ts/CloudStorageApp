import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import config from '@/utils/config';

const useUpload = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone()

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

      acceptedFiles.splice(1);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    getRootProps, getInputProps, upload,
    file: acceptedFiles[0]
  }
}

export default useUpload;