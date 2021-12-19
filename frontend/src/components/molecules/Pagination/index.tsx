import type { Props } from './type';
import useLogic from './hook';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import Row from './Row';

const Pagination: React.FC<Props> = ({ pages, page, getNextDatas, getPrevDatas, changePage }) => {
  const { listOpen, handleListOpen, handleListClose } = useLogic();

  return (
    <Wrapper>
      <PaginationButton active={!(1 > page - 1)} className="PaginationItemElement" onClick={getPrevDatas}>前へ</PaginationButton>
      <CurrentPage className="PaginationNumbersElement PaginationItemElement" onClick={handleListOpen}>
        <PageList className="PaginationNumbersElement">
          <CurrentNumber className="PaginationNumbersElement">{page}</CurrentNumber>
          <Arrow className="PaginationNumbersElement" />
        </PageList>
        <PaginationNumbers listOpen={listOpen}>
          <List
            itemCount={pages > 1 ? pages : 1}
            itemSize={50}
            height={100}
            width={100}
            itemData={{
              onClick: (page: number) => {
                handleListClose();
                changePage(page);
              },
              page
            }}
          >
            {Row}
          </List>
        </PaginationNumbers>
      </CurrentPage>
      <PaginationButton active={!(pages < page + 1)} className="PaginationItemElement" onClick={getNextDatas}>次へ</PaginationButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .PaginationItemElement {
    &:not(:first-child) {
      margin-left: 24px;
    }
  }
`;

const PaginationButton = styled.button<{ active: boolean }>`
  font-size: 14px;
  opacity: ${props => props.active ? 1 : 0.2};
  pointer-events: ${props => props.active ? 'auto' : 'none'};
`;

const PageList = styled.div`
  display: flex;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
`;

const CurrentPage = styled.div`
  position: relative;
  display: inline-flex;
  cursor: pointer;
`;

const CurrentNumber = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const Arrow = styled.div`
  position: relative;
  height: 100%;
  width: 30px;
  border-left: 1px solid #ddd;
  background-color: #f2f2f2;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 5px 0 5px;
    border-color: #000000 transparent transparent transparent;
  }
`;

const PaginationNumbers = styled.div<{ listOpen: boolean }>`
  position: absolute;
  top: 50%;
  left: 25%;
  transition: ${props => props.listOpen ? 'all 0.3s' : 'all 0.1s'};
  transform: ${props => props.listOpen ? 'translateY(-50%)' : 'translateY(-50%) scale(0)'};
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1000;
  overflow: hidden;
`;



export default Pagination;