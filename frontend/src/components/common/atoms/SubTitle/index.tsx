import type { Props } from './type';
import styled, { css } from 'styled-components';

const SubTitle: React.FC<Props> = ({ children, as }) => {
  return (
    as === 'dt' ?
      <dt><Text>{children}</Text></dt>
    : <h3><Text>{children}</Text></h3>
  )
}

const Text = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 12px;
`;


export default SubTitle;