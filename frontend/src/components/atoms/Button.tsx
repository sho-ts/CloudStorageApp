import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';

type Props = {
  as?: 'a' | 'div' | 'button',
  href?: string,
  onClick?: any,
  style?: CSSProperties,
  download?: boolean,
}

const Button: React.FC<Props> = ({ as, href, children, style, onClick, download }) => {
  switch (as) {
    case 'a':
      return <A download={download} href={href} style={style} onClick={onClick}><Inner>{children}</Inner></A>
    case 'div':
      return <Div style={style} onClick={onClick}><Inner>{children}</Inner></Div>
    default:
      return <Default style={style} onClick={onClick}><Inner>{children}</Inner></Default>
  }
};

const ButtonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 172px;
  height: 54px;
  border-radius: 28px;
  background-color: #105cc3;
  color: #fff;
  text-align:center;
  font-weight: bold;
  padding: 0 42px;
  cursor: pointer;
`;

const Default = styled.button`${ButtonStyle}`;
const A = styled.a`${ButtonStyle}`;
const Div = styled.div`${ButtonStyle}`;

const Inner = styled.span`
`;

export default Button;