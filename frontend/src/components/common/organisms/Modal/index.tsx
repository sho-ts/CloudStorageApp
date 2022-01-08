import { Props } from './type';
import styled from 'styled-components';
import { mq } from '@mixin';
import { ModalWrapper } from '@/components/common/molecules';

const Modal: React.FC<Props> = ({
  isOpen, onClose, title, children
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Inner>
        <Heading>{title}</Heading>
        {children}
      </Inner>
    </ModalWrapper>
  )
}

const Heading = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #59f;
`;

const Inner = styled.div`
  background-color: #fff;
  max-width: 700px;
  position: relative;
  z-index: 99999999;
  width: 100%;
  padding: 24px;
  ${mq()} {
    width: 70%;
  }
`;

export default Modal;