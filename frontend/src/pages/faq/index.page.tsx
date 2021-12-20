import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { mq } from '@mixin';
import { PageTitle } from '@/components/atoms';
import { Container } from '@/components/templates';
import { withUserLayoutIgnoreMainLayout } from '@layout';

const FAQ = () => {
  const faqs = useMemo(() => [
    {
      question: '無料で利用できますか？',
      answer: '1GBまでは無料で利用できます。それ以降は有料となります。<br />勝手に課金されることはありません',
    },
    {
      question: 'ディレクトリ作成数に制限はありますか？',
      answer: '無料プランでは20個まで作成することができます。有料プランでは100個まで作成することができます。',
    },
    {
      question: 'ファイルアップロード数に制限はありますか？',
      answer: '数は無制限ですが、容量に制限があります。無料プランでは1GBまで、有料プランの場合は20GBまでアップロードすることが可能です。',
    },
    {
      question: 'ダウンロード回数に制限はありますか？',
      answer: '基本的にありません。ただし、ご利用状況によっては制限させていただく場合があります。',
    },
    {
      question: '有料プランを解除したいのですが、アップロードされているファイルは削除されますか？',
      answer: '有料プランを解除した際にストレージ容量の制限を超えていた場合、古いものから優先的に削除され、閲覧不可能になります。',
    },
    {
      question: '退会したいのですが',
      answer: 'こちらのフォームから退会することができます。',
    },
  ], [])

  return (
    <Container size="lg">
      <PageTitle>よくある質問</PageTitle>
      <dl>
        {faqs.map((faq, index) => (
          <Item key={index}>
            <Question dangerouslySetInnerHTML={{__html: faq.question}} />
            <Answer dangerouslySetInnerHTML={{__html: faq.answer}} />
          </Item>
        ))}
      </dl>
    </Container>
  )
}

const Item = styled.div`
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

export default withUserLayoutIgnoreMainLayout(FAQ);