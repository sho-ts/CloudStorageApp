import type { Props } from './type';
import useLogic from './hook';
import { Button, TextField } from '@/components/common/atoms';
import { Modal } from '@/components/common/organisms';

const SearchModal: React.FC<Props> = ({
  isOpen, onClose,
}) => {
  const { keyword, setKeyword, onClickSearch } = useLogic(onClose);

  return (
    <Modal
      title="ファイル検索"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TextField
        style={{ marginBottom: 16 }}
        placeholder="検索ワード"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onClickSearch}>検索</Button>
      </div>
    </Modal>
  )
}

export default SearchModal;