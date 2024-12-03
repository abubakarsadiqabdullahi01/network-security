"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExtendedUser } from "@/next-auth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface UserInfoProps {
  user?: ExtendedUser
  label: string
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-muted-foreground">{label}</p>
      </CardHeader>
      <div className="flex justify-center -mt-4 -mb-4">
        <Avatar className="w-30 h-30 border-4 border-background mb-5">
          <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
          <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="space-y-4 pt-4">
        {user ? (
          <>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">ID</p>
              <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                {user.id}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Name</p>
              <p className="truncate">{user.name}</p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Email</p>
              <p className="truncate">{user.email}</p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Role</p>
              <Badge variant={user.role === "ADMIN" ? "destructive" : "secondary"}>
                {user.role}
              </Badge>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Two Factor Authentication</p>
              <Badge variant={user.isTwoFactorEnabled ? "success" : "secondary"}>
                {user.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
            </div>
          </>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No user information available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

