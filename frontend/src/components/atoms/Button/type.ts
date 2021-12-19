import type { CSSProperties } from 'react';

export type Props = {
  as?: 'a' | 'div' | 'button',
  href?: string,
  onClick?: any,
  style?: CSSProperties,
  download?: boolean,
  outline?: boolean,
  className?: string,
  target?: string
}

export type ButtonStyleProps = {
  outline?: boolean,
}