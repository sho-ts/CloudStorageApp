export enum USER_TYPE { GUEST, MEMBER, COMMON }

const CONSTANT_VARIABLES = {
  navItems: [
    { href: '/signup', innerText: '新規登録', user: USER_TYPE.GUEST },
    { href: '/signin', innerText: 'ログイン', user: USER_TYPE.GUEST },
    { href: '/mypage', innerText: 'マイページ', user: USER_TYPE.MEMBER, },
    { href: '/signout', innerText: 'ログアウト', user: USER_TYPE.MEMBER },
    { href: '/', innerText: 'よくある質問', user: USER_TYPE.COMMON },
    { href: '/', innerText: 'お問い合わせ', user: USER_TYPE.COMMON },
  ],
  siteName: 'CloudStorageApp'
}

export default CONSTANT_VARIABLES;