import type { ApiDirType } from '@/types/ApiDirType';

export type Props = {
  dirs?: ApiDirType[]
  uploadModalOpen: () => void
}