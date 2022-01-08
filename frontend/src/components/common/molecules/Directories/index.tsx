import type { Props } from './type';
import styled, { css } from 'styled-components';
import { hover, mq } from '@mixin';
import Image from 'next/image'
import Link from 'next/link';

const Directories: React.FC<Props> = ({ dirs, modalOpen }) => {
  return (
    <Wrapper>
      <Heading>
        <HeadingIcon>
          <Image src="/imgs/common/dir-icon.svg" width="64" height="64" alt="" />
        </HeadingIcon>
        <h3>ディレクトリ</h3>
      </Heading>
      <List>
        <Item><Link href="/mypage"><a>全て</a></Link></Item>
        {dirs.map(dir => (
          <Item key={dir.id}>
            <Link href={`/directory/${dir.id}`}>
              <a>{dir.name}</a>
            </Link>
          </Item>
        ))}
      </List>
      <AddIcon onClick={modalOpen}>
        <Image src="/imgs/common/add-icon.svg" width="64" height="64" alt="" />
      </AddIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 24px 0;
`;

const Heading = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  h3 {
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
  a {
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s;
    display: block;
    padding: 8px 8px 8px 24px;
    ${mq()} {
      padding-left: 32px;
    }
    ${mq('lg')} {
      padding-left: 56px;
    }
    ${hover(css`
      background-color: #ededed;
    `)}
  }
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