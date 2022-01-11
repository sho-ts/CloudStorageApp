import type { ApiDirType } from '@common/types/ApiDirType';
import type { KeyedMutator } from 'swr';

export type Props = {
  dir: DirType | null,
  isOpen: boolean,
  onClose: any,
  mutate?: KeyedMutator<DirType>
}