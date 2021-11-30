import styled from 'styled-components';
import { mq } from '@mixin';

type Props = {
  target?: string,
  href?: string,
  rel?: string
  onClick?: any,
}

const TextLink: React.FC<Props> = ({ rel, target, href, children, onClick }) => {
  return (
    <Anchor
      onClick={onClick}
      target={target}
      href={href}
      rel={rel}
    >
      {children}
    </Anchor>
  )
}

const Anchor = styled.a`
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

export default TextLink;