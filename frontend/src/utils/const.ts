export enum USER_TYPE { GUEST, MEMBER, COMMON }

export enum MESSAGE_TYPE { NOTICE, ERROR };

export enum DISCLOSURE_TYPE { PUBLIC, PRIVATE };

export enum PLAN_TYPE { FREE, PREMIUM };

export const NAV_ITEMS = [
  { href: '/signup', innerText: '新規登録', user: USER_TYPE.GUEST },
  { href: '/signin', innerText: 'ログイン', user: USER_TYPE.GUEST },
  { href: '/mypage', innerText: 'マイページ', user: USER_TYPE.MEMBER, },
  { href: '/setting', innerText: '会員情報', user: USER_TYPE.MEMBER, },
  { href: '/signout', innerText: 'ログアウト', user: USER_TYPE.MEMBER },
  { href: '/faq', innerText: 'よくある質問', user: USER_TYPE.COMMON },
  { href: '/', innerText: 'お問い合わせ', user: USER_TYPE.COMMON },
]

export const SITE_NAME = 'CloudStorageApp';