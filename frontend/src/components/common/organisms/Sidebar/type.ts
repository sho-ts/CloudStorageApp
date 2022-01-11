import type { ApiDirType } from '@common/types/ApiDirType';

export type Props = {
  handleUploadModalOpen: () => void,
  handleDirModalOpen: () => void,
  keyword: string,
  onChangeSearch: any,
  dirs?: ApiDirType[],
}