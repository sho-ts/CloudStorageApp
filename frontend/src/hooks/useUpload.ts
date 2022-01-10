import type { S3ReponseType } from '@/types/S3ResponseType';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone'
import { useSelector, useFlash } from '@/hooks';
import { mutate } from 'swr';
import { createAxiosInstance, queryBuilder } from '@/utils';
import { MESSAGE_TYPE } from '@/utils/const'

const useUpload = (onClose: any) => {
  const router = useRouter();
  const flash = useFlash();
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [uploadDir, setUploadDir] = useState<number | null>(null);
  const [disclosureRange, setDisclosureRange] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);
  const { keyword } = useSelector(state => state.search);
  const page = Number(router.query.page ?? 1);
  const dir = router.query.dir_id as string;

  const query = queryBuilder({
    page,
    s: keyword,
    dir,
  })

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
      const axiosInstance = await createAxiosInstance();

      const s3res = await axiosInstance.post<S3ReponseType>('/file/upload', formData);

      await axiosInstance.post('/post', {
        description: fileName,
        filePath: s3res.data.Key,
        fileSize: file.size,
        disclosureRange,
        dir: uploadDir,
      });

      setComplete(true);
      clearFile();
      onClose();
      mutate(`/post/all?${query}`);

      flash({
        message: 'ファイルのアップロードに成功しました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: 'ファイルのアップロードに失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
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