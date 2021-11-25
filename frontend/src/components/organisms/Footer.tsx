import Link from 'next/link';
import styled from 'styled-components';
import { mq } from '@mixin';
import { SiteLogo } from '@/components/atoms';

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <SiteLogo />
        <Menu>
          <Item>
            <Link href="/">
              <a>新規登録</a>
            </Link>
          </Item>
          <Item>
            <Link href="/">
              <a>ログイン</a>
            </Link>
          </Item>
          <Item>
            <Link href="/">
              <a>よくある質問</a>
            </Link>
          </Item>
          <Item>
            <Link href="/">
              <a>お問い合わせ</a>
            </Link>
          </Item>
          <Item>
            <Link href="/">
              <a>GitHub</a>
            </Link>
          </Item>
        </Menu>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background-color: #f2f2f2;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column-reverse;
  max-width: 1300px;
  text-align: center;
  margin: 0 auto;
  padding: 48px 24px;
  ${mq('lg')} {
    padding: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Menu = styled.ul`
  ${mq('md')} {
    display: flex;
  }
  ${mq('lg', 'down')} {
    margin: 0 auto 32px;
  }
`;

const Item = styled.li`
  font-size: 14px;
  &:not(:last-child) {
    ${mq('md', 'down')} {
      margin-bottom: 16px;
    }
    ${mq('md')} {
      margin-right: 32px;
    }
  }
`;

export default Footer;