import type { NextRouter } from 'next/router';

const createPagination = <T extends { pages: number }>(
  current: number,
  path: string,
  router: NextRouter,
  data?: T,
) => ([
  () => {
    if (!data) return;

    const next = current + 1
    data.pages < next || router.push(`${path}?page=${next}`);
  },
  () => {
    if (!data) return;

    const prev = current - 1;
    // ページ番号が1の場合はクエリパラメータなしのページに移動する
    1 > prev || prev === 1 ? router.push(`${path}`) : router.push(`${path}?page=${prev}`);
  }
]);

export default createPagination;