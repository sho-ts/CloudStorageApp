import styled, { css } from 'styled-components';
import { DirType } from '@/types/DirType';
import { hover, mq } from '@mixin';
import dirIcon from '@imgs/common/dir-icon.svg';
import addIcon from '@imgs/common/add-icon.svg';
import Image from 'next/image'

type Props = {
  dirs: DirType[]
  changeDir: any,
  modalOpen?: any,
  setPage: any,
}

const Directories: React.FC<Props> = ({ dirs, changeDir, modalOpen, setPage }) => {
  const onClickChangeDir = (dir: DirType | null) => {
    changeDir(dir);
    setPage(1);
  }

  return (
    <Wrapper>
      <Heading>
        <HeadingIcon>
          <Image src={dirIcon} />
        </HeadingIcon>
        <span>ディレクトリ</span>
      </Heading>
      <List>
        <Item onClick={() => onClickChangeDir(null)}>全て</Item>
        {dirs.map(dir => <Item key={dir.id} onClick={() => onClickChangeDir(dir)}>{dir.name}</Item>)}
      </List>
      <AddIcon onClick={modalOpen}>
        <Image src={addIcon} />
      </AddIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 24px 0;
`;

const Heading = styled.h3`
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  span {
    display: block;
    margin-top: -2px;
  }
`;

const HeadingIcon = styled.div`
  width: 24px;
  margin-right: 8px;
  margin-top: 2px;
`;

const List = styled.ul`
  margin-bottom: 16px;
  margin-left: -16px;
  ${mq()} {
    margin-left: -24px;
  }
  ${mq('lg')} {
    margin-left: -48px;
  }
`;

const Item = styled.li`
  cursor: pointer;
  padding: 8px 8px 8px 24px;
  font-size: 13px;
  transition: all 0.3s;
  ${mq()} {
    padding-left: 32px;
  }
  ${mq('lg')} {
    padding-left: 56px;
  }
  ${hover(css`
    background-color: #ededed;
  `)}
`;

const AddIcon = styled.div`
  width: 24px;
  margin-left: auto;
  cursor: pointer;
  transition: all 0.3s;
  ${hover(css`
    opacity: 0.7;
  `)}
`;

export default Directories;