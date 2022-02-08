import type { NextRouter } from 'next/router';

const createPagination = <T extends { pages: number }>(
  current: number,
  path: string,
  router: NextRouter,
  subQuery: string,
  data?: T,
): [() => void, () => void, (page: number) => void] => ([
  () => {
    if (!data) return;

    const next = current + 1
    data.pages < next || router.push(`${path}?page=${next}${subQuery}`);
  },
  () => {
    if (!data) return;

    const prev = current - 1;
    // ページ番号が1の場合はクエリパラメータなしのページに移動する
    1 > prev || prev === 1 ? router.push(`${path}?${subQuery.slice(1)}`) : router.push(`${path}?page=${prev}${subQuery}`);
  },
  (page: number) => {
    router.push(`${path}?page=${page}${subQuery}`)
  }
]);

export default createPagination;