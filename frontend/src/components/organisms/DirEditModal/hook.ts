import type { DirType } from '@/types/DirType';
import type { KeyedMutator } from 'swr';
import { useState, useEffect } from 'react';
import { useFlash } from '@/hooks';
import { useRouter } from 'next/router';
import { mutate as globalMutate } from 'swr';
import { config, createAxiosInstance, queryBuilder } from '@/utils';
import { MESSAGE_TYPE } from '@/utils/const'

const useLogic = (onClose: any, dir: DirType | null, mutate?: KeyedMutator<DirType>) => {
  const flash = useFlash();
  const router = useRouter();
  const currentDir = Number(router.query.dir_id);
  const [dirName, setDirName] = useState<string>('');

  const query = queryBuilder({
    id: dir?.id
  });

  const editDir = async () => {
    if (!dirName || !dir || !mutate) return;

    try {
      const axiosInstance = await createAxiosInstance();
      await axiosInstance.put(`/directory?${query}`, { dirName });

      onClose();
      mutate();
      globalMutate(`${config.api}/directory/all`);
      flash({
        message: 'ディレクトリを編集しました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: 'ディレクトリの編集に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  const deleteDir = async () => {
    if (!dir || !mutate) return;

    try {
      if (!confirm('ディレクトリ内のファイルも全て削除され、元に戻すことはできません。\n本当に削除しますか？')) return;

      const axiosInstance = await createAxiosInstance();
      await axiosInstance.delete(`/directory?${query}`);

      onClose();
      mutate();
      dir.id === currentDir && await router.push('/mypage');

      flash({
        message: 'ディレクトリを削除しました',
        type: MESSAGE_TYPE.NOTICE
      })
    } catch (e) {
      flash({
        message: 'ディレクトリの削除に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  useEffect(() => {
    setDirName(dir?.name ?? '');
  }, [dir]);

  return { dirName, setDirName, editDir, deleteDir }
}

export default useLogic;