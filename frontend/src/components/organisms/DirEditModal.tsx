import type { DirType } from '@/types/DirType';
import type { KeyedMutator } from 'swr';
import { useState, useEffect } from 'react';
import { useFlash } from '@/hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { mutate as globalMutate } from 'swr';
import { auth } from '@/utils/aws';
import { config, queryBuilder } from '@/utils';
import { MESSAGE_TYPE } from '@/utils/const'
import { Button, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';

type Props = {
  dir: DirType | null,
  isOpen: boolean,
  onClose: any,
  mutate?: KeyedMutator<DirType>
}

const DirEditModal: React.FC<Props> = ({
  isOpen, onClose, dir, mutate,
}) => {
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
      const { token } = await auth.getIdTokenAndUser();

      await axios.put(`${config.api}/directory?${query}`, {
        dirName,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

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
      const { token } = await auth.getIdTokenAndUser();

      if (!confirm('ディレクトリ内のファイルも全て削除され、元に戻すことはできません。\n本当に削除しますか？')) return;

      await axios.delete(`${config.api}/directory?${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      onClose();
      mutate();
      dir.id === currentDir && router.push('/mypage');
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

  return (
    <Modal
      title="ディレクトリ編集"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextField
        style={{ marginBottom: 16 }}
        placeholder="ディレクトリ名"
        value={dirName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
      />
      <div>
        <Box>
          <Button onClick={editDir}>編集</Button>
        </Box>
        <Box>
          <Button onClick={deleteDir}>削除</Button>
        </Box>
      </div>
    </Modal>
  )
}

const Box = styled.div`
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 32px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 32px;
  }
`;

export default DirEditModal;