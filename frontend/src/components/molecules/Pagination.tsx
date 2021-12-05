import styled from 'styled-components';
import { Button } from '@/components/atoms';

type Props = {
  pages: number,
  current: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
}

const Pagination: React.FC<Props> = ({ pages, current, getNextDatas, getPrevDatas, }) => {
  return (
    <PaginationButtons>
      {1 > current - 1 || <Button className="pagination-button" outline onClick={getPrevDatas}>前へ</Button>}
      {pages < current + 1 || <Button className="pagination-button" outline onClick={getNextDatas}>次へ</Button>}
    </PaginationButtons>
  )
}

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  .pagination-button {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;


export default Pagination;