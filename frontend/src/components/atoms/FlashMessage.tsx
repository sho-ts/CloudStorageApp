import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import { hidden } from '@/stores/flash';
import styled from 'styled-components';
import { MESSAGE_TYPE } from '@/utils/const'

const FlashMessage = () => {
  const dispatch = useDispatch();
  const flash = useSelector(props => props.flash);

  useEffect(() => {
    (async () => {
      if (!flash.active) return;

      await new Promise<void>(resolve => setTimeout(resolve, 5000));
      dispatch(hidden());
    })();
  }, [flash.active]);

  const close = () => dispatch(hidden());

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