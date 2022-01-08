import { mq } from '@mixin';
import styled from 'styled-components';
import Image from 'next/image'

const Architect = () => {
  return (
    <Wrapper>
      <Inner>
        <Heading>アーキテクチャ</Heading>
        <Sentence>
          CSAはクラウドインフラ技術や、<br />
        モダンフロントエンドフレームワークで開発しています。<br />
        また、ソースコードは全てGitHubのPublicリポジトリで公開しています。<br />
        以下はCSAで使用している技術の一例です。
      </Sentence>
        <Icons>
          <Icon>
            <Image src="/imgs/top/aws-logo.svg" width="304" height="182" alt="AWS" />
          </Icon>
          <Icon>
            <Image src="/imgs/top/next-logo.svg" width="512" height="309" alt="Next.js" />
          </Icon>
          <Icon>
            <Image src="/imgs/top/nest-logo.svg" width="64" height="64" alt="Nest.js" />
          </Icon>
        </Icons>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-color: #f2f2f2;
  padding: 60px 0;
  ${mq()} {
    padding: 120px 0;
  }
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  @media screen and (max-width: 1032px) {
    padding: 0 16px;
  }
`;

const Heading = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 48px;
  ${mq()} {
    font-size: 40px;
  }
`;

const Sentence = styled.p`
  margin-bottom: 32px;
  line-height: ${32 / 18};
  ${mq()} {
    text-align: center;
    margin-bottom: 64px;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  ${mq()} {
    width: 15%;
  }
  &:not(:last-child) {
    margin-right: 10%;
  }
  div {
    width: 100%!important;
  }
`;

export default Architect;