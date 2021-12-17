import { DISCLOSURE_TYPE } from '@/utils/const';

export type PostType = {
  id: number,
  uid: string,
  directoryId: number | null, // nullの場合は「すべて」からのみ参照できる
  description: string, // ファイル名
  created_at: Date,
  updated_at: Date,
  del_flg: number,
  file_size: string,
  file_path: string, // S3のキー
  disclosure_range: DISCLOSURE_TYPE, // 公開範囲
  allowed_email?: string[] | null, // 非公開にしている場合、自分以外に閲覧を許可するEメール
  password?: string | null, // 非公開にしている場合、自分以外に閲覧を許可するためのパスワード
}