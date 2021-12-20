import { Fragment } from 'react';
import { useMemo } from 'react';
import { useSelector } from '@/hooks';
import { PageTitle, FAQItem } from '@/components/atoms';
import { Container } from '@/components/templates';
import Head from 'next/head';
import { withCommonLayout } from '@layout';

const FAQ = () => {
  const user = useSelector(props => props.user);

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
      isOnlyUser: true
    },
  ], [])

  return (
    <Container size="lg">
      <Head><title>よくある質問</title></Head>
      <PageTitle>よくある質問</PageTitle>
      <dl>
        {faqs.map((faq, index) => (
          <Fragment key={index}>
            {faq.isOnlyUser ? user.isSignIn ? (
              // 会員のみ
              <FAQItem {...faq} />
            ) : <></> : (
              // 共通
              <FAQItem {...faq} />
            )}
          </Fragment>
        ))}
      </dl>
    </Container>
  )
}

export default withCommonLayout(FAQ);