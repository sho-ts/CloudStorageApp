import type { DirType } from '@/types/DirType';

export type Props = {
  dirs?: DirType[]
  uploadModalOpen: () => void
}