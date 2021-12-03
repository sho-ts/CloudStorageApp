import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { config } from '@/utils';
import { S3ReponseType } from '@/types/S3ResponseType';
import { auth } from '@/utils/aws';
import axios from 'axios';

const useUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
  })

  const upload = async () => {
    setComplete(false);
    setWait(true);

    if (acceptedFiles.length < 1 || wait) return;

    const [file] = files;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const user = await auth.getUser();
      const token = auth.getIdToken();

      if (!user || !token) throw new Error('不正なユーザー');

      const sub = user.getCognitoUserAttribute('sub');

      if (!sub) throw new Error('ユーザーIDが存在しません');

      const s3res = await axios.post<S3ReponseType>(`${config.api}/file/upload`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      await axios.post(`${config.api}/post`, {
        'description': `${file.name}`,
        'filePath': s3res.data.Key,
        'fileSize': file.size,
        'uid': sub.getValue()
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      setComplete(true);
      setFiles([]);
    } catch (e) {
      console.error(e);
    } finally {
      setWait(false);
    }
  }

  return {
    getRootProps, getInputProps, upload,
    file: files[0], complete
  }
}

export default useUpload;