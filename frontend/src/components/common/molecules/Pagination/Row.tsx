import styled, { css } from 'styled-components';
import { hover } from '@mixin';

const Row: React.FC<any> = (props) => (
  <PaginationNumber
    isCurrent={props.index + 1 === props.data.page}
    className="PaginationRow"
    style={props.style}
    onClick={() => { props.data.onClick(props.index + 1) }}>
    {(props.index) + 1}
  </PaginationNumber>
);

const PaginationNumber = styled.div<{ isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${props => props.isCurrent ? '#f5f5f5' : '#fff'};
  transition: background-color 0.3s;
  ${hover(css`
    background-color: #f5f5f5;
  `)}
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

export default Row;