import useLogic from './hook';
import styled from 'styled-components';
import { MESSAGE_TYPE } from '@/utils/const'

const FlashMessage: React.VFC = () => {
  const { flash, close } = useLogic();

  return (
    <>
      {flash.active && (
        <Wrapper className={`_${flash.type}`} onClick={close}>
          <span>{flash.message}</span>
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index:10000000000000;
  font-size: 13px;
  cursor: pointer;
  &._${MESSAGE_TYPE.NOTICE} {
    background-color: #54c288;
  }
  &._${MESSAGE_TYPE.ERROR} {
    background-color: #dc143c;
  }
`;

export default FlashMessage;