import styled from 'styled-components';
import { Button } from '@/components/atoms';

type Props = {
  pages: number,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
}

const Pagination: React.FC<Props> = ({ pages, page, getNextDatas, getPrevDatas, }) => {
  return (
    <PaginationButtons>
      {1 > page - 1 || <Button className="pagination-button" outline onClick={getPrevDatas}>前へ</Button>}
      {pages < page + 1 || <Button className="pagination-button" outline onClick={getNextDatas}>次へ</Button>}
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