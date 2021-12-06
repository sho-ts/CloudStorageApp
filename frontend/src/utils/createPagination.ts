const createPagination = <T extends { pages: number }>(
  current: number,
  dispacthCurrent: (value: number) => void,
  data?: T,
) => ([
  () => {
    if (!data) return;

    const next = current + 1
    data.pages < next || dispacthCurrent(next);
  },
  () => {
    if (!data) return;

    const prev = current - 1;
    1 > prev || dispacthCurrent(prev);
  }
]);

export default createPagination;