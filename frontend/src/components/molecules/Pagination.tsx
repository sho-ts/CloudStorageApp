import { useEffect } from 'react';
import { useModal } from '@/hooks';
import styled, { css } from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { hover } from '@mixin';

type Props = {
  pages: number,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
  changePage: (page: number) => void,
}

const Row: React.FC<any> = (props) => (
  <PaginationNumber
    isCurrent={props.index + 1 === props.data.page}
    className="PaginationRow"
    style={props.style}
    onClick={() => { props.data.onClick(props.index + 1) }}>
    {(props.index) + 1}
  </PaginationNumber>
)

const Pagination: React.FC<Props> = ({ pages, page, getNextDatas, getPrevDatas, changePage }) => {
  const [listOpen, handleListOpen, handleListClose] = useModal();
  const onClickClose = (e: any) => !e.target.classList.contains('PaginationNumbersElement') && handleListClose();

  useEffect(() => {
    window.addEventListener('click', onClickClose);

    return () => {
      window.removeEventListener('click', onClickClose);
    }
  }, [])

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

export default Pagination;