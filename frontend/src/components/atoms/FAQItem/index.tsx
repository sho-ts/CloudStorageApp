import type { Props } from './type';
import styled, { css } from 'styled-components';
import { mq } from '@mixin';

const FAQItem: React.VFC<Props> = ({ question, answer }) => {
  return (
    <Wrapper>
      <Question dangerouslySetInnerHTML={{ __html: question }} />
      <Answer dangerouslySetInnerHTML={{ __html: answer }} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const BaseStyle = (style: {
  content: string,
  backgroundColor: string
}) => css`
  position: relative;
  background-color: ${style.backgroundColor};
  padding: 16px 16px 16px calc(16px + 1.5em);
  line-height: 1.5;
  ${mq()} {
    font-size: 18px;
  }
  &::before {
    content: '${style.content}';
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
`;

const Question = styled.dt`
  ${BaseStyle({
  content: 'Q',
  backgroundColor: '#eee'
})}
`;

const Answer = styled.dd`
  ${BaseStyle({
  content: 'A',
  backgroundColor: '#fff'
})}
`;


export default FAQItem;