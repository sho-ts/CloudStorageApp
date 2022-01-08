import type { Props } from './type';
import styled from 'styled-components';

const Select: React.FC<Props> = ({ onChange, value, children, style }) => {
  return (
    <Wrapper style={style}>
      <Body value={value} onChange={onChange}>
        {children}
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 6px 0 6px;
    border-color: #000000 transparent transparent transparent;
  }
`;

const Body = styled.select`
  width: 100%;
  padding: 14px 32px 14px 16px;
  border: 1px solid #a3a3a3;
  border-radius: 8px;
`;

export default Select;