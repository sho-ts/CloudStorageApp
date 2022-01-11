import type { ApiDirType } from '@/types/ApiDirType';
import type { KeyedMutator } from 'swr';

export type Props = {
  dir: ApiDirType | null,
  isOpen: boolean,
  onClose: any,
  mutate?: KeyedMutator<ApiDirType>
}