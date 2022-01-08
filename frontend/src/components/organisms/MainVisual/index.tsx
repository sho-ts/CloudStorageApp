import type { Props } from './type';
import styled from 'styled-components';
import { mq, perce } from '@mixin';
import { Button } from '@/components/atoms';
import Image from 'next/image'

const MainVisual: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper>
      <Inner>
        <Catch>
          <Heading>大切なデータを<br />クラウドに保存</Heading>
          <Read>
            CSAは、クラウド上に<br />あなたのファイルを簡単に保存、共有<br />することができるサービスです。
          </Read>
          <Button onClick={onClick}>使ってみる</Button>
        </Catch>
        <Figure>
          <Image src="/imgs/top/mv__figure.png" width="454" height="384" alt="" />
        </Figure>
      </Inner>
    </Wrapper>)
}

const Wrapper = styled.div`
  background-color: #d8e8fe;
`;

const Inner = styled.div`
  padding: 48px 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mq()} {
    display: flex;
    flex-direction: row;
    max-width: 1000px;
    padding: 64px 32px;
  }
  ${mq('lg')} {
    margin: 0 auto;
    padding: 90px 0;
  }
`;

const Catch = styled.div`
  flex-shrink: 0;
  ${mq()} {
    margin-right: 56px;
  }
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: ${60 / 48};
  letter-spacing: 0.06em;
  margin-bottom: 32px;
  ${mq()} {
    font-size: 48px;
    margin-bottom: 48px;
  }
`;

const Read = styled.p`
  line-height: ${32 / 18};
  margin-bottom: 24px;
  ${mq()} {
    margin-bottom: 40px;
  }
`;

const Figure = styled.figure`
  ${mq('md', 'down')} {
    margin-top: 32px;
  }
  ${mq()} {
    width: ${perce(400, 1000)};
  }
  ${mq('lg')} {
    position: static;
    width: ${perce(454, 1000)};
  }
`;

export default MainVisual;