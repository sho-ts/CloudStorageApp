import type { ApiPostType } from '@/types/ApiPostType';
import { useState } from 'react';
import { useFlash } from '@/hooks';
import { mutate } from 'swr';
import { config, createAxiosInstance, queryBuilder } from '@/utils';
import { MESSAGE_TYPE, DISCLOSURE_TYPE } from '@const';

const useLogic = (post: ApiPostType, onClose: any) => {
  const flash = useFlash();
  const [fileName, setFileName] = useState<string>(post.description);
  const [dirId, setDirId] = useState<string>('');
  const [disclosureRange, setDisclosureRange] = useState<DISCLOSURE_TYPE>(post.disclosure_range);

  const query = queryBuilder({
    id: post.id
  });

  const update = async () => {
    try {
      const axiosInstance = await createAxiosInstance();

      await axiosInstance.put(`/post?${query}`, {
        description: fileName,
        dir: Number(dirId),
        disclosureRange: disclosureRange
      });

      mutate(`${config.api}/post/?${query}`)
      flash({
        message: 'ファイルの更新に成功しました',
        type: MESSAGE_TYPE.NOTICE
      });
      onClose();
    } catch (e) {
      flash({
        message: 'ファイルの更新に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return { fileName, setFileName, dirId, disclosureRange, setDisclosureRange, setDirId, update }
}

export default useLogic;