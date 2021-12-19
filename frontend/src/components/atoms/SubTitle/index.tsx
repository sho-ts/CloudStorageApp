import styled from 'styled-components';

const SubTitle: React.FC = ({ children }) => {
  return <Text>{children}</Text>
}

const Text = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
`;

export default SubTitle;