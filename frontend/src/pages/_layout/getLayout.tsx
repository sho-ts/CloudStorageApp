import { UserLayout, GuestLayout } from '@/components/common/templates';
import Provider, { AuthProvider } from '@/provider';
import type { ReactElement } from 'react'

export const getUserLayout = (page: ReactElement) => {
  return (
    <AuthProvider>
      <UserLayout>{page}</UserLayout>
    </AuthProvider>
  )
};

getUserLayout.ignoreMainLayout = (page: ReactElement) => {
  return (
    <AuthProvider>
      <UserLayout ignoreMainLayout={true}>{page}</UserLayout>
    </AuthProvider>
  )
}

export const getGuestLayout = (page: ReactElement) => {
  return (
    <Provider>
      <GuestLayout>{page}</GuestLayout>
    </Provider>
  )
};

export const getCommonLayout = (page: ReactElement) => (
  <AuthProvider notRedirect={true}>
    <GuestLayout>{page}</GuestLayout>
  </AuthProvider>
)