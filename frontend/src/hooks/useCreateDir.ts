import { useState } from 'react';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import { mutate } from 'swr';
import axios from 'axios';

const useCreateDir = (
  onClose?: () => void
) => {
  const [dirName, setDirName] = useState<string>('');

  const createDir = async () => {
    if (!dirName) return;

    try {
      await auth.getUser();
      const token = auth.getIdToken();

      await axios.post(`${config.api}/directory`, {
        dirName
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setDirName('');
      onClose && onClose();
      mutate(`${config.api}/directory/all`);
    } catch (e) {
      alert('ディレクトリの作成に失敗しました');
    }
  }

  return { dirName, setDirName, createDir };
}

export default useCreateDir;