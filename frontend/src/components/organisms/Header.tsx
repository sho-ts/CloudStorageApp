import { useState } from 'react';
import { CONSTANT_VARIABLES } from '@/utils';
import { mq } from '@mixin';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { SiteLogo } from '@/components/atoms';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Wrapper>
      <SiteLogo />
      <ToggleButton alia-label="menu"><span /></ToggleButton>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const ButtonBorderStyle = css`
  position: absolute;
  width: 34px;
  height: 2px;
  background-color: #000;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 60px;
  width: 60px;
  span {
    ${ButtonBorderStyle}
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: '';
      ${ButtonBorderStyle}
      top: -10px;
      left: 0;
    }
    &::after {
      content: '';
      ${ButtonBorderStyle};
      top: 10px;
      left: 0;
    }
  }
`;

export default Header;