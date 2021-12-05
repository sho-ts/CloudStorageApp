import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';

type Props = {
  as?: 'a' | 'div' | 'button',
  href?: string,
  onClick?: any,
  style?: CSSProperties,
  download?: boolean,
  outline?: boolean,
}

const Button: React.FC<Props> = ({ as, href, children, style, onClick, download, outline }) => {
  switch (as) {
    case 'a':
      return <A download={download} href={href} style={style} onClick={onClick} outline={outline}><Inner>{children}</Inner></A>
    case 'div':
      return <Div style={style} onClick={onClick} outline={outline}><Inner>{children}</Inner></Div>
    default:
      return <Default style={style} onClick={onClick} outline={outline}><Inner>{children}</Inner></Default>
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

const outlineStyle = css`
  border: 2px solid #105cc3;
  color: #105cc3;
  background-color: #fff;
`;

type ButtonStyleProps = {
  outline?: boolean,
}

const Default = styled.button<ButtonStyleProps>`
  ${ButtonStyle}
  ${props => props.outline && outlineStyle}
`;
const A = styled.a<ButtonStyleProps>`
  ${ButtonStyle}
  ${props => props.outline && outlineStyle}
`;
const Div = styled.div<ButtonStyleProps>`
  ${ButtonStyle}
  ${props => props.outline && outlineStyle}
`;

const Inner = styled.span`
  pointer-events: none;
`;

export default Button;