import type { DirType } from '@/types/DirType';
import type { PostType } from '@/types/PostType';
import { useState } from 'react';
import { useFlash } from '@/hooks';
import { mutate } from 'swr';
import styled from 'styled-components';
import axios from 'axios';
import { config, queryBuilder } from '@/utils';
import { auth } from '@/utils/aws';
import { MESSAGE_TYPE, DISCLOSURE_TYPE } from '@const';
import { Select, TextField, Button, SubTitle } from '@/components/atoms';
import { Modal } from '@/components/organisms';

const useLogic = (post: PostType, onClose: any) => {
  const flash = useFlash();
  const [fileName, setFileName] = useState<string>(post.description);
  const [dirId, setDirId] = useState<string>('');
  const [disclosureRange, setDisclosureRange] = useState<DISCLOSURE_TYPE>(post.disclosure_range);

  const query = queryBuilder({
    id: post.id
  });

  const update = async () => {
    try {
      const { token } = await auth.getIdTokenAndUser();

      await axios.put(`${config.api}/post?${query}`, {
        description: fileName,
        dir: Number(dirId),
        disclosureRange: disclosureRange
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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