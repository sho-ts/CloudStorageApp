import { ORDER_BY, SORT_TYPE } from '@/utils/const';
import { BsSortDown, BsSortUp } from 'react-icons/bs';

const OrderIcon: React.VFC<{ order: ORDER_BY }> = ({ order }) => {
  switch(order) {
    case ORDER_BY.DESC:
    default:
      return <BsSortDown size="14" />
    case ORDER_BY.ASC:
      return <BsSortUp size="14" />
  }
}

export default OrderIcon;