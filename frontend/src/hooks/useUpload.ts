import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { fetcher, config } from '@/utils';
import { S3ReponseType } from '@/types/S3ResponseType';
import { auth } from '@/utils/aws';

const useUpload = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone()

  const upload = async () => {
    if (acceptedFiles.length < 1) return;
    const [file] = acceptedFiles;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();

      if(!user || !token) throw new Error('不正なユーザー');

      const sub = user.getCognitoUserAttribute('sub');
      
      if(!sub) throw new Error('ユーザーIDが存在しません');

      const s3json = await fetcher<S3ReponseType>(`${config.api}/file/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const dbres = await fetch(`${config.api}/post`, {
        method: 'POST',
        body: JSON.stringify({
          'description': `${file.name}`,
          'filePath': s3json.Key,
          'fileSize': file.size,
          'uid': sub.getValue()
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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