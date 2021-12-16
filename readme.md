# CloudStorageApp

クラウド上にファイルを保存することができるアプリケーションです

---

## 技術スタック

### フロントエンド
- TypeScript
- React.js
- Next.js
- Redux
- styled-component
- storybook

### バックエンド
- TypeScript
- Nest.js
- TypeORM

### インフラ
- docker
- docker-compose
- Amazon EC2

### ストレージ
- Amazon S3

### 認証
- Amazon Cognito

---

## フロントディレクトリ構成
src以下
```
├ assets/
│ ├ css/ グローバルで適用するスタイル
│ └ imgs/ 画像
├ components/
│ ├ atoms/
│ ├ molecules/
│ ├ organisms/
│ └ templates/
├ hooks/ 共通で使うカスタムフック
├ pages/
│ ├ _layouts/ 共通レイアウト（HOC）
│ └ **/
│   ├ **.page.tsx ページのコンポーネント本体
│   └ hook.ts このページ内のみで使うロジック
├ provider/
├ stores/ Reduxのstore
├ stories/ Storybook
├ types/ importして使う型
├ utils/ ユーティリティ
│ ├ aws/ AWS関連
│ └ style/mixin/  styled-componentで使う為のmixin
```