import type { ApiDirType } from '@/types/ApiDirType';
import type { PostsType } from '@/types/PostsType';
import type { KeyedMutator } from 'swr';

export type Props = {
  posts?: PostsType,
  page: number,
  getNextDatas: () => void,
  getPrevDatas: () => void,
  changePage: (page: number) => void,
  dir?: ApiDirType | null,
  isModalOpen?: boolean
  handleDirEditModalOpen?: () => void,
  handleDirEditModalClose?: () => void,
  mutate?: KeyedMutator<ApiDirType>
}