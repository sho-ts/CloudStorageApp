import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import { hidden } from '@/stores/flash';
import styled, { keyframes } from 'styled-components';

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
        <Wrapper onClick={close}>
          <span>{flash.message}</span>
        </Wrapper>
      )}
    </>
  )
}

const Animation = keyframes`
  0%, 100% {
    transform: translateY(-50px);
  }
  50% {
    transform: none;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #66f;
  color: #fff;
  z-index:10000000000000;
  font-size: 13px;
  cursor: pointer;
  /* animation-name: ${Animation};
  animation-duration: 5000ms; */
`;

export default FlashMessage;