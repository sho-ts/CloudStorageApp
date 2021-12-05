import { css } from 'styled-components';
import { mq } from '@mixin';
import { FlattenSimpleInterpolation } from 'styled-components';

const hover = (style: FlattenSimpleInterpolation) => css`
  &:hover {
    ${mq('lg')} {
      ${style}
    }
  }
`;

export default hover;