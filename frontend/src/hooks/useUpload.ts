import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { config } from '@/utils';
import { S3ReponseType } from '@/types/S3ResponseType';
import { auth } from '@/utils/aws';
import axios from 'axios';
import { KeyedMutator } from 'swr';
import { PostsType } from '@/types/PostsType';
import { DirType } from '@/types/DirType';

const useUpload = (dirs: DirType[], onClose: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [uploadDir, setUploadDir] = useState<number | null>(null);
  const [disclosureRange, setDisclosureRange] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      setFileName(file.name);
      setDisclosureRange(0);

      if (file.size >= 524288000) {
        alert('一度にアップロードできるサイズは500MBまでです');
        acceptedFiles.pop();

        return;
      }

      setFiles([...files, ...acceptedFiles]);
    },
  })

  const clearFile = () => {
    acceptedFiles.pop();
    setFiles([]);
  }

  const upload = async () => {
    setComplete(false);
    setWait(true);

    if (acceptedFiles.length < 1 || wait) return;

    const [file] = files;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = auth.getIdToken();
      const s3res = await axios.post<S3ReponseType>(`${config.api}/file/upload`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      await axios.post(`${config.api}/post`, {
        description: fileName,
        filePath: s3res.data.Key,
        fileSize: file.size,
        disclosureRange,
        dir: uploadDir,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      setComplete(true);
      clearFile();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setWait(false);
    }
  }

  return {
    getRootProps, getInputProps, upload, clearFile,
    fileName, disclosureRange, uploadDir,
    setFileName, setDisclosureRange, setUploadDir,
    file: files[0], complete
  }
}

export default useUpload;