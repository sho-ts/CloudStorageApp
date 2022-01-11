import type { ApiDirType } from '@/types/ApiDirType';
import type { ApiPostType } from '@/types/ApiPostType';

export type Props = {
  isOpen: boolean,
  onClose: any,
  post: ApiPostType
  dirs?: ApiDirType[]
}
