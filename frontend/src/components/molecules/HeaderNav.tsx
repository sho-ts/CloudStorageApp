import React from 'react';
import styled from 'styled-components';
import { mq } from '@mixin';
import { CONSTANT_VARIABLES } from '@/utils'
import { USER_TYPE } from '@/utils/const';
import { ModalWrapper } from '@/components/molecules';
import Link from 'next/link';

type Props = {
  onClose: any,
  isOpen?: boolean,
  isGuest?: boolean,
}

const HeaderNav: React.FC<Props> = ({ onClose, isOpen, isGuest }) => {
  return (
    <ModalWrapper onClose={onClose} isOpen={isOpen}>
      <Inner isOpen={isOpen}>
        <Menu>
          {CONSTANT_VARIABLES.navItems.map((item, key) => (
            <React.Fragment key={key}>
              {isGuest && item.user === USER_TYPE.GUEST && (
                <Item>
                  <Link href={item.href}>
                    <a onClick={onClose}>{item.innerText}</a>
                  </Link>
                </Item>
              )}
              {isGuest || item.user === USER_TYPE.MEMBER && (
                <Item>
                  <Link href={item.href}>
                    <a onClick={onClose}>{item.innerText}</a>
                  </Link>
                </Item>
              )}
              {item.user === USER_TYPE.COMMON && (
                <Item>
                  <Link href={item.href}>
                    <a onClick={onClose}>{item.innerText}</a>
                  </Link>
                </Item>
              )}
            </React.Fragment>
          ))}
          <Item>
            <a href="https://github.com/frontTSend/CloudStorageApp" target="_blank" rel="noreferrer">GitHub</a>
          </Item>
        </Menu>
      </Inner>
    </ModalWrapper>
  )
}

const Inner = styled.div.attrs((props: { isOpen?: boolean }) => ({
  style: {
    transform: props.isOpen ? 'none' : 'translateX(calc(100% + 10px))',
  }
})) <{ isOpen?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100% - 100px);
  background-color: #fff;
  transition: all 0.3s;
  padding: 32px;
  z-index: 5010000;
  ${mq()} {
    width: 300px;
  }
`;

const Menu = styled.ul`

`;

const Item = styled.li`
  font-size: 18px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;


export default HeaderNav;