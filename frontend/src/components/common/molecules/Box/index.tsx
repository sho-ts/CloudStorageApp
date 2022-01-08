import type { Props } from './type';
import styled from 'styled-components';

const Box = styled.div.attrs<Props>(({ mb, mt, align }) => ({
  style: {
    marginTop: mt,
    marginBottom: mb,
    textAlign: align
  }
})) <Props>`
  margin-bottom: 16px;
`

export default Box;