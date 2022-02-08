import { ORDER_BY, SORT_TYPE } from '@/utils/const';
import { useRouter } from 'next/router';

const useLogic = () => {
  const router = useRouter();
  const nextOrder = (() => {
    switch (router.query.order as ORDER_BY) {
      case ORDER_BY.DESC:
        return ORDER_BY.ASC;
      case ORDER_BY.ASC:
        return ORDER_BY.DESC;
      default:
        return ORDER_BY.DESC
    }
  })();

  const subQuery = (router.asPath.split('?')[1] ?? '').
    split('&')
    .filter(v => (!v.includes('sort') && !v.includes('order') && v))
    .map(v => '&' + v).join('');
  const path = router.asPath.replace(/\?.*$/, ''); // クエリパラメータなしのパス

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value);
  }

  const sort = router.query.sort as SORT_TYPE | undefined;
  const order = router.query.order as ORDER_BY | undefined;

  return { subQuery, path, nextOrder, sort, order, onChangeSort };
}

export default useLogic;