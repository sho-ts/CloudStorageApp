import type { Props } from './type';
import { Button } from '@/components/common/atoms';
import styled from 'styled-components';
import { mq } from '@mixin';

const GetStarted: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper>
      <Heading>さぁ、今すぐ始めよう</Heading>
      <Sentence>
        CSAの利用は基本無料です。<br />
      今すぐ登録して、利用を開始しましょう。
      </Sentence>
      <ButtonWrapper>
        <Button onClick={onClick}>使ってみる</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 0;
  ${mq()} {
    padding: 120px 0;
  }
  @media screen and (max-width: 1031px) {
    padding-left: 16px;
    padding-right: 16px;
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
  line-height: ${32 / 18};
  letter-spacing: 0.06em;
  margin-bottom: 48px;
  ${mq()} {
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

export default GetStarted;