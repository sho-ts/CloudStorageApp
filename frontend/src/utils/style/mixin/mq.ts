import { css } from 'styled-components';

const breakpoints = {
  md: 768,
  lg: 1024,
}

const mq = (breakpoint: 'md' | 'lg' = 'md', type: 'up' | 'down' = 'up') => {
  const mediqQuery = (() => {
    switch (type) {
      case 'up':
        return `min-width: ${breakpoints[breakpoint]}px`;
      case 'down':
        return `max-width: ${breakpoints[breakpoint] - 1}px`;
    }
  })();

  return css`@media screen and (${mediqQuery})`;
}

export default mq;