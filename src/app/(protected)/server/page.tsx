import { UserInfo } from '@/components/user-infor';
import { currentUser } from '@/lib/auth'
import React from 'react'

const ServerPage = async () => {
    const user = await currentUser();

  return (
    <UserInfo label="User Information" user={user} />
  )
}

export default ServerPage