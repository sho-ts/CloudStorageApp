import styled from 'styled-components';
import { mq } from '@mixin';

const Wrapper = styled.div`
  margin-bottom: 24px;
  ${mq()} {
    margin-bottom: 32px;
  }
`

const Body = styled.h1`
  font-weight: bold;
  border-left: 4px solid #59f;
  padding: 4px 16px;
  font-size: 24px;
  ${mq()} {
    font-size: 24px;
  }
`;

const PageTitle: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Body>
        <span>{children}</span>
      </Body>
    </Wrapper>
  )
}

export default PageTitle;