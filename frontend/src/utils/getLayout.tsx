import { UserLayout, GuestLayout } from '@/components/templates';
import type { ReactElement } from 'react'

export const getUserLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
};

export const getGuestLayout = (page: ReactElement) => {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
};