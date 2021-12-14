import { useState } from 'react';
import { useDispatch } from '@/hooks';
import { setSearchKeyword } from '@/stores/search';
import { Button, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
}

const SearchModal: React.FC<Props> = ({
  isOpen, onClose,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const dispatch = useDispatch();

  const onClickSearch = () => {
    dispatch(setSearchKeyword(keyword));
    onClose();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

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