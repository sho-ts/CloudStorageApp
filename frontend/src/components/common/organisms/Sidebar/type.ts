import type { DirType } from '@/types/DirType';

export type Props = {
  handleUploadModalOpen: () => void,
  handleDirModalOpen: () => void,
  keyword: string,
  onChangeSearch: any,
  dirs?: DirType[],
}