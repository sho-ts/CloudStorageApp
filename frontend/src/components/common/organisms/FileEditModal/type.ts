import type { DirType } from '@/types/DirType';
import type { PostType } from '@/types/PostType';

export type Props = {
  isOpen: boolean,
  onClose: any,
  post: PostType
  dirs?: DirType[]
}
