import type { Props } from './type'
import React from 'react';
import { USER_TYPE, NAV_ITEMS } from '@/utils/const';
import styled from 'styled-components';
import { mq } from '@mixin';
import { SiteLogo } from '@/components/common/atoms';
import Link from 'next/link';

const Footer: React.FC<Props> = ({ isGuest }) => {
  return (
    <Wrapper>
      <Inner>
        <SiteLogo />
        <Menu>
          {NAV_ITEMS.map((item, key) => (
            <React.Fragment key={key}>
              {isGuest && item.user === USER_TYPE.GUEST && (
                <Item>
                  <Link href={item.href}>
                    <a>{item.innerText}</a>
                  </Link>
                </Item>
              )}
              {isGuest || item.user === USER_TYPE.MEMBER && (
                <Item>
                  <Link href={item.href}>
                    <a>{item.innerText}</a>
                  </Link>
                </Item>
              )}
              {item.user === USER_TYPE.COMMON && (
                <Item>
                  <Link href={item.href}>
                    <a>{item.innerText}</a>
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
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background-color: #f2f2f2;
  ${mq('md', 'down')} {
    padding-bottom: 52px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column-reverse;
  max-width: 1300px;
  text-align: center;
  margin: 0 auto;
  padding: 48px 24px;
  ${mq('lg')} {
    padding: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Menu = styled.ul`
  ${mq('md')} {
    display: flex;
  }
  ${mq('lg', 'down')} {
    margin: 0 auto 32px;
  }
`;

const Item = styled.li`
  font-size: 14px;
  &:not(:last-child) {
    ${mq('md', 'down')} {
      margin-bottom: 16px;
    }
    ${mq('md')} {
      margin-right: 32px;
    }
  }
`;

export default Footer;