import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { fetcher, config } from '@/utils';
import { S3ReponseType } from '@/types/S3ResponseType';

const useUpload = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone()

  const upload = async () => {
    if (acceptedFiles.length < 1) return;
    const [file] = acceptedFiles;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const s3json = await fetcher<S3ReponseType>(`${config.api}/post/upload`, {
        method: 'POST',
        body: formData,
      });

      const dbres = await fetch(`${config.api}/post`, {
        method: 'POST',
        body: JSON.stringify({
          'description': `${file.name}`,
          'filePath': s3json.Key,
          'fileSize': file.size
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!dbres.ok) throw new Error('アップロードに失敗')
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