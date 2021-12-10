import type { DirType } from '@/types/DirType';
import type { KeyedMutator } from 'swr';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
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
  const [dirName, setDirName] = useState<string>('');

  const editDir = async () => {
    if (!dirName || !dir || !mutate) return;

    try {
      const { token } = await auth.getIdTokenAndUser();

      await axios.put(`${config.api}/directory?id=${dir.id}`, {
        dirName,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      onClose();
      mutate();
    } catch (e) {
      alert('ディレクトリの編集に失敗しました');
    }
  }

  const deleteDir = async () => {
    if (!dir || !mutate) return;

    try {
      const { token } = await auth.getIdTokenAndUser();

      if (!confirm('ディレクトリ内のファイルも全て削除され、元に戻すことはできません。\n本当に削除しますか？')) return;

      await axios.delete(`${config.api}/directory?id=${dir.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      onClose();
      mutate();
    } catch (e) {
      alert('ディレクトリの削除に失敗しました');
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