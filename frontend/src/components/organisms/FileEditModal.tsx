import type { DirType } from '@/types/DirType';
import type { PostType } from '@/types/PostType';
import { useState } from 'react';
import { useFlash } from '@/hooks';
import { mutate } from 'swr';
import styled from 'styled-components';
import axios from 'axios';
import { config } from '@/utils';
import { auth } from '@/utils/aws';
import { MESSAGE_TYPE } from '@/utils/const';
import { Select, TextField, Button } from '@/components/atoms';
import { Modal } from '@/components/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
  post: PostType
  dirs?: DirType[]
}

const FileEditModal: React.FC<Props> = ({
  isOpen, onClose, post, dirs
}) => {
  const flash = useFlash();
  const [fileName, setFileName] = useState<string>(post.description);
  const [dirId, setDirId] = useState<string>('');

  const update = async () => {
    try {
      const { token } = await auth.getIdTokenAndUser();

      await axios.put(`${config.api}/post?id=${post.id}`, {
        description: fileName,
        dir: Number(dirId)
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      mutate(`${config.api}/post/?id=${post.id}`)
      flash({
        message: 'ファイルの更新に成功しました',
        type: MESSAGE_TYPE.NOTICE
      });
    } catch (e) {
      flash({
        message: 'ファイルの更新に失敗しました',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ファイル編集"
    >
      <Box>
        <TextField
          value={fileName}
          placeholder="ファイル名"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
        />
      </Box>
      <Box>
        <Select
          value={dirId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDirId(e.target.value)}
        >
          <option value="">すべて</option>
          {dirs && dirs.map(dir => <option key={dir.id} value={dir.id}>{dir.name}</option>)}
        </Select>
      </Box>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={update}>編集</Button>
      </div>
    </Modal>
  )
}

const Box = styled.div`
  margin-bottom: 16px;
`;

export default FileEditModal;