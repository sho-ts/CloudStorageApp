import styled from 'styled-components';
import { ModalWrapper } from '@/components/organisms';

type Props = {
  isOpen: boolean,
  onClose: any,
  title: string,
  children: React.ReactNode,
}

const Modal: React.FC<Props> = ({
  isOpen, onClose, title, children
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} w="70%" maxW="500px">
      <Inner>
        {children}
      </Inner>
    </ModalWrapper>
  )
}

const Inner = styled.div`
  background-color: #fff;
`;

export default Modal;