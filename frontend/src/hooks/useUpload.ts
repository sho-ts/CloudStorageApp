import type { ApiUserType } from '@/types/ApiUserType';
import type { S3ReponseType } from '@/types/S3ResponseType';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone'
import { useSelector, useFlash } from '@/hooks';
import { mutate } from 'swr';
import { createAxiosInstance, queryBuilder } from '@/utils';
import { MESSAGE_TYPE, PLAN_TYPE, STORAGE_TYPE } from '@/utils/const'
import { translateByte } from '@/utils'

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
  const user = useSelector(state => state.user);
  const page = Number(router.query.page ?? 1);
  const dir = router.query.dir_id as string;

  const query = queryBuilder({
    page,
    s: keyword,
    dir,
  })

  const checkStorage = async (file: File) => {
    const axiosInstance = await createAxiosInstance();
    const res = await axiosInstance.get<ApiUserType>('user');

    const nextStorage = res.data.storage + translateByte(file.size, 'kb');

    switch (user.plan) {
      case PLAN_TYPE.GUEST:
        return nextStorage < STORAGE_TYPE.GUEST;
      case PLAN_TYPE.FREE:
        return nextStorage < STORAGE_TYPE.FREE;
      case PLAN_TYPE.PREMIUM:
        return nextStorage < STORAGE_TYPE.PREMIUM;
      default:
        return false;
    }
  }

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      setFileName(file.name);
      setDisclosureRange(0);

      const checkedStorage = await checkStorage(file);
      if (!checkedStorage) {
        flash({
          message: 'ストレージの容量が制限に達しています',
          type: MESSAGE_TYPE.ERROR
        })
        acceptedFiles.pop();
        return;
      }

      if (file.size >= 524288000) {
        flash({
          message: '一度にアップロードできるサイズは500MBまでです',
          type: MESSAGE_TYPE.ERROR
        })
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

      const checkedStorage = await checkStorage(file);
      if (!checkedStorage) {
        throw new Error();
      }

      const s3res = await axiosInstance.post<S3ReponseType>('/file/upload', formData);

      await axiosInstance.post('/post', {
        description: fileName,
        filePath: s3res.data.Key,
        fileSize: translateByte(file.size, 'kb'),
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