import React from 'react';
import styled, { css } from 'styled-components';
import { mq, hover } from '@mixin';
import { USER_TYPE, NAV_ITEMS } from '@/utils/const';
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
        {NAV_ITEMS.map((item, key) => (
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

const Item = styled.li`
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  a {
    position: relative;
    display: block;
    padding: 24px 32px 24px 32px;
    transition: all 0.3s;
    ${hover(css`
      background-color: #f2f2f2;
      &::before {
        right: 20px;
      }
    `)}
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%) rotate(-45deg);
      width: 10px;
      height: 10px;
      border-right: 2px solid #030303;
      border-bottom: 2px solid #030303;
      transition: all 0.3s;
    }
  }
`;


export default HeaderNav;