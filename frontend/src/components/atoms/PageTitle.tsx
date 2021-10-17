import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const Body = styled.h1`
  font-weight: bold;
  border-left: 4px solid #59f;
  padding: 8px 16px;
  font-size: 18px;
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