import React from 'react';
import styled from 'styled-components';
import { mq } from '@mixin';
import { USER_TYPE, NAV_ITEMS } from '@/utils/const';
import { NavItem } from '@/components/atoms';
import { ModalWrapper } from '@/components/molecules';

type Props = {
  onClose: any,
  isOpen?: boolean,
  isGuest?: boolean,
}

const HeaderNav: React.FC<Props> = ({ onClose, isOpen, isGuest }) => {
  return (
    <ModalWrapper onClose={onClose} isOpen={isOpen}>
      <Inner isOpen={isOpen}>
        {NAV_ITEMS.map((item, key) => (
          <React.Fragment key={key}>
            {isGuest && item.user === USER_TYPE.GUEST && <NavItem item={item} onClose={onClose} />}
            {isGuest || item.user === USER_TYPE.MEMBER && <NavItem item={item} onClose={onClose} />}
            {item.user === USER_TYPE.COMMON && <NavItem item={item} onClose={onClose} />}
          </React.Fragment>
        ))}
        <NavItem href="https://github.com/frontTSend/CloudStorageApp">GitHub</NavItem>
      </Inner>
    </ModalWrapper>
  )
}

const Inner = styled.ul<{ isOpen?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100% - 100px);
  background-color: #fff;
  transition: all 0.3s;
  transform: ${props => props.isOpen ? 'none' : 'translateX(calc(100% + 10px))'};
  z-index: 5010000;
  ${mq()} {
    width: 300px;
  }
`;

export default HeaderNav;