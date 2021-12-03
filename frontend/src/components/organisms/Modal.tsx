import styled from 'styled-components';
import { ModalWrapper } from '@/components/molecules';

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
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Inner>
        {children}
      </Inner>
    </ModalWrapper>
  )
}

const Inner = styled.div`
  background-color: #fff;
  width: 70%;
  max-width: 700px;
  position: relative;
  z-index: 99999999;
`;

export default Modal;