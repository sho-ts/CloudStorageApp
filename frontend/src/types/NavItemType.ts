export enum USER_TYPE { GUEST, MEMBER, COMMON }

export type NavItemType = {
  href: string,
  innerText: string
  user: USER_TYPE
}