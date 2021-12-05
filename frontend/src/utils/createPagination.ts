import { SetStateAction } from 'react';

const createPagination = <T extends { pages: number }>(
  current: number,
  setCurrent: (value: SetStateAction<number>) => void,
  data?: T,
) => ([
  () => {
    if (!data) return;

    const next = current + 1
    data.pages < next || setCurrent(next);
  },
  () => {
    if (!data) return;

    const prev = current - 1;
    1 > prev || setCurrent(prev);
  }
]);

export default createPagination;