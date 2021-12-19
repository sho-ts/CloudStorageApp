import styled from 'styled-components';
import { mq, perce } from '@mixin';
import Image from 'next/image'
import figure1 from '@imgs/top/feature__figure1.png';
import figure2 from '@imgs/top/feature__figure2.png';

const Feature = () => {
  return (
    <Wrapper>
      <Item type="iphone">
        <Inner>
          <Heading>簡単にファイルを保存、共有</Heading>
          <Figure position="left" circle="#5e9df2">
            <Image src={figure1} alt=""></Image>
          </Figure>
          <Sentence>
            CSAはお使いのデバイスからクラウド上に簡単にファイルを保存することができます。<br />
            保存したファイルは他のデバイスからアクセスしたり、共有することが可能です。<br />
            もうストレージ容量で悩むことはありません。
          </Sentence>
        </Inner>
      </Item>
      <Item type="mac">
        <Inner>
          <Heading>高速なファイル転送</Heading>
          <Figure position="right" circle="#54c288">
            <Image src={figure2} alt=""></Image>
          </Figure>
          <Sentence>
            CSAはクラウドに保存したファイルを高速でダウンロードすることができます。<br />
            大容量のファイルでもストレスを感じずにファイル転送が可能です。
          </Sentence>
        </Inner>
      </Item>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  max-width: 900px;
  padding: 60px 0;
  margin: 0 auto;
  ${mq()} {
    padding: 120px 0;
  }
  @media screen and (max-width: 931px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

const Item = styled.div.attrs((props: { type: 'iphone' | 'mac' }) => ({
  type: props.type
}))`
  ${mq()} {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: ${props => props.type === 'iphone' ? 'row-reverse' : 'row'};
    width: 100%;
  }
  &:not(:last-child) {
    margin-bottom: 100px;
  }
  &::before {
    ${mq()} {
      content: '';
      display: block;
      width: 0;
      height: 0;
      padding-top: ${props => props.type === 'iphone' ? '49%' : '38%'}
    }
  }
`;

const Inner = styled.div`
  ${mq()} {
    width: ${perce(495, 900)};
  }
`;

const Heading = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  ${mq('md', 'down')} {
    font-size: 24px;
    text-align: center;
  }
`;

const Figure = styled.figure.attrs((props: {
  position: 'left' | 'right',
  circle: string,
}) => ({
  left: props.position === 'left' ? 0 : 'auto',
  right: props.position === 'right' ? 0 : 'auto',
  circle: props.circle,
}))<{
  position: 'left' | 'right',
  circle: string,
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mq('md', 'down')} {
    max-width: 200px;
    min-height: 240px;
    margin: 0 auto 32px;
  }
  ${mq()} {
    position: absolute;
    top: 50%;
    left: ${props => props.left};
    right: ${props => props.right};
    transform: translateY(-50%);
  }
  ${mq()} {
    width: ${perce(300, 900)};
  }}
  ${mq('lg')} {
    width: ${perce(360, 900)};
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 260px;
    background-color: ${props => props.circle};
    border-radius: 50%;
    ${mq()} {
      width: 100%;
      height: 0;
      padding-top: 100%;
    }
    ${mq('lg')} {
      width: 344px;
      height: 344px;
      padding-top: 0;
    }
  }
  img {
    position: relative;
    z-index: 900;
  }
`;

const Sentence = styled.p`
  line-height: 30px;
  letter-spacing: 0.06em;
`;

export default Feature;