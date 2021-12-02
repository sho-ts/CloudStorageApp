import styled from 'styled-components';

type Props = {
  isOpen?: boolean,
  onClose: any,
  w?: string,
  maxW?: string
}

const ModalWrapper: React.FC<Props> = ({ isOpen, onClose, children, w, maxW }) => {
  return (
    <Wrapper isOpen={isOpen}>
      <ModalChildren style={{ width: w, maxWidth: maxW }}>
        {children}
      </ModalChildren>
      <CloseWrapper onClick={onClose} />
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs((props: { isOpen?: boolean }) => ({
  style: {
    opacity: props.isOpen ? 1 : 0,
    visibility: props.isOpen ? 'visible' : 'hidden',
  }
})) <{ isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
  cursor: pointer;
  padding: 16px;
  transition: all 0.3s;
  z-index: 9999999999999;
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000000;
`;

const ModalChildren = styled.div`
  position: relative;
  z-index: 5000100;
`;

export default ModalWrapper;