import type { Props } from './type'
import styled from 'styled-components';
import { mq } from '@mixin';
import { Modal } from '@/components/common/organisms';

const SearchOptionModal: React.VFC<Props> = ({isOpen, onClose}) => {
  return (
    <Modal
      title="検索オプション"
      isOpen={isOpen}
      onClose={onClose}
    >

    </Modal>
  )
}

export default SearchOptionModal