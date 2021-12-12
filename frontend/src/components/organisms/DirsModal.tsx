import type { DirType } from '@/types/DirType';
import { useRouter } from 'next/router';
import { Select } from '@/components/atoms';
import { Modal } from '@/components/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
  dirs?: DirType[]
}

const DirsModal: React.FC<Props> = ({
  isOpen, onClose, dirs
}) => {
  const router = useRouter();
  const changeDir = (id: string) => {
    onClose();
    id ? router.push(`/directory/${id}`) : router.push('/mypage');
  }

  return (
    <Modal
      title="ディレクトリ切り替え"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeDir(e.target.value)}
      >
        <option value="">すべて</option>
        {dirs && dirs.map(dir => <option key={dir.id} value={dir.id}>{dir.name}</option>)}
      </Select>
    </Modal>
  )
}

export default DirsModal;