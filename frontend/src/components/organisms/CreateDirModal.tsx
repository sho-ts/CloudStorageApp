import { Button, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import styled from 'styled-components';
import { DirType } from '@/types/DirType';
import { KeyedMutator } from 'swr';
import { useState } from 'react';
import axios from 'axios';
import { auth } from '@/utils/aws';
import { config } from '@/utils';

type Props = {
  isOpen: boolean,
  onClose: any,
  mutate: KeyedMutator<DirType[]>
}

const CreateDirModal: React.FC<Props> = ({
  isOpen, onClose, mutate,
}) => {
  const [dirName, setDirName] = useState<string>('');

  const createDir = async () => {
    if (!dirName) return;

    try {
      await auth.getUser();
      const token = auth.getIdToken();

      const res = await axios.post(`${config.api}/directory`, {
        dirName
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setDirName('');
      onClose();
      mutate();
    } catch (e) {
      alert('ディレクトリの作成に失敗しました');
    }
  }

  return (
    <Modal
      title="ディレクトリ作成"
      isOpen={isOpen}
      onClose={onClose}
    >
        <TextField
          style={{ marginBottom: 16 }}
          placeholder="ディレクトリ名"
          value={dirName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
        />
        <Button onClick={createDir}>作成</Button>
    </Modal>
  )
}

export default CreateDirModal;