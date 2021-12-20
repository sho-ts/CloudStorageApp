import type { Props } from './type';
import styled, { css } from 'styled-components';
import { hover } from '@mixin';
import Link from 'next/link';

const NavItem: React.FC<Props> = ({ onClose, item, href, children }) => (
  <Body>
    {item ? (
      <Link href={item.href}>
        <a onClick={onClose}><span>{item.innerText}</span></a>
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer"><span>{children}</span></a>
    )}
  </Body>
)

const Body = styled.li`
  font-size: 18px;
  margin-bottom: 1px;
  a {
    position: relative;
    display: block;
    padding: 24px 32px 24px 32px;
    transition: all 0.3s;
    letter-spacing: 0.25em;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    will-change: transform;
    ${hover(css`
      background-color: #f2f2f2;
      border-color: #f2f2f2;
      letter-spacing: 0.4em;
      transform: scale(1.05);
      position: relative;
      z-index: 100;
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


export default NavItem;