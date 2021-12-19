import type { DirType } from '@/types/DirType';
import type { PostsType } from '@/types/PostsType';
import type { KeyedMutator } from 'swr';

export type Props = {
  posts?: PostsType,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
  changePage: (page: number) => void,
  dir?: DirType | null,
  isModalOpen?: boolean
  handleDirEditModalOpen?: () => void,
  handleDirEditModalClose?: () => void,
  mutate?: KeyedMutator<DirType>
}