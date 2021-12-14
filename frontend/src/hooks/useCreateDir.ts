import { useState } from 'react';
import { useFlash } from '@/hooks';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import { mutate } from 'swr';
import { MESSAGE_TYPE } from '@/utils/const'
import axios from 'axios';

const useCreateDir = (
  onClose?: () => void
) => {
  const flash = useFlash();
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
      flash({
        message: 'ディレクトリを作成しました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: 'ディレクトリの作成に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return { dirName, setDirName, createDir };
}

export default useCreateDir;