import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { hover } from '@mixin';

type Props = {
  as?: 'a' | 'div' | 'button',
  href?: string,
  onClick?: any,
  style?: CSSProperties,
  download?: boolean,
  outline?: boolean,
  className?: string,
  target?: string
}

const Button: React.FC<Props> = (props) => {
  switch (props.as) {
    case 'a':
      return <A {...props}><Inner>{props.children}</Inner></A>
    case 'div':
      return <Div {...props}><Inner>{props.children}</Inner></Div>
    default:
      return <Default {...props}><Inner>{props.children}</Inner></Default>
  }
};

type ButtonStyleProps = {
  outline?: boolean,
}

const ButtonHoverStyle = (main: string, sub: string) => hover(css`
  background-color: ${main};
  border-color: ${sub};
  color: ${sub};
`);

const outlineStyle = css`
  border: 2px solid #105cc3;
  color: #105cc3;
  background-color: #fff;
  ${ButtonHoverStyle('#105cc3', '#fff')}
`;

const ButtonStyle = (props: ButtonStyleProps) => css<ButtonStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  border-radius: 28px;
  background-color: #105cc3;
  border: 2px solid #105cc3;
  color: #fff;
  text-align:center;
  font-weight: bold;
  padding: 0 42px;
  cursor: pointer;
  transition: all 0.3s;
  ${ButtonHoverStyle('#fff', '#105cc3')}
  ${props.outline && outlineStyle}
`;

const Default = styled.button<ButtonStyleProps>`${props => ButtonStyle(props)}`;
const A = styled.a<ButtonStyleProps>`${props => ButtonStyle(props)}`;
const Div = styled.div<ButtonStyleProps>`${props => ButtonStyle(props)}`;

const Inner = styled.span`
  pointer-events: none;
`;

export default Button;