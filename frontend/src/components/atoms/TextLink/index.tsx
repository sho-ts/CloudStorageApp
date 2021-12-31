import type { Props } from './type';
import React from 'react';
import styled, { css } from 'styled-components';
import { mq } from '@mixin';
import Link from 'next/link';

const TextLink: React.FC<Props> = ({ rel, target, href, children }) => {
  return !target ? (
    <Wrapper>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </Wrapper>
  ) : (
    <Anchor
      target={target}
      href={href}
      rel={rel}
    >
      {children}
    </Anchor>
  )
}

const BaseStyle = css`
  color: #105cc3;
  ${mq('lg')} {
    transition: all 0.3s;
  }
  &:hover {
    ${mq('lg')} {
        opacity: 0.7;
    }
  }
`;

const Wrapper = styled.span`
  a {
    ${BaseStyle}
  }
`;

const Anchor = styled.a`${BaseStyle}`;

export default TextLink;