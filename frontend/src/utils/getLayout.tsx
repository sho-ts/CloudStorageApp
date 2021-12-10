import { UserLayout, GuestLayout } from '@/components/templates';
import Provider from '@/provider';
import Auth from '@/provider/AuthProvider';
import type { ReactElement } from 'react'

export const getUserLayout = (page: ReactElement) => {
  return (
    <Provider>
      <Auth>
        <UserLayout>
          {page}
        </UserLayout>
      </Auth>
    </Provider>
  )
};

getUserLayout.ignoreMainLayout = (page: ReactElement) => {
  return (
    <Provider>
      <Auth>
        <UserLayout ignoreMainLayout={true}>
          {page}
        </UserLayout>
      </Auth>
    </Provider>
  )
}

export const getGuestLayout = (page: ReactElement) => {
  return (
    <Provider>
      <GuestLayout>
        {page}
      </GuestLayout>
    </Provider>
  )
};