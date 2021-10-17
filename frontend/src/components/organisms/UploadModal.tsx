import { Modal } from '@/components/organisms';
import { UploadArea } from '@/components/molecules';

type Props = {
  isOpen: boolean,
  onClose: any
}

const UploadModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="新規アップロード"
      isOpen={isOpen}
      onClose={onClose}
    >
      <UploadArea />
    </Modal>
  )
}

export default UploadModal;