/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Pencil, Trash, UserCheck, UserX } from 'lucide-react'
import { useUsers } from '@/features/user/hooks/useUsers'
import type { User } from '@/features/user/types/user.types'
import { SystemUserFormModel } from '../models/system-user-form-model'
import { toast } from 'sonner'
import { useModal } from '@/hooks/modal/useModal'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'

type SystemUserTabProps = {
  staffId: string
  userId: string
}

export function SystemUserTab({ staffId, userId }: SystemUserTabProps) {
  const { isOpen, openModal } = useModal('system-user-form')
  const [openReset, setOpenReset] = useState(false)
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const {
    user,
    handleResetPassword,
    handleDeactivateAccount,
    handleActivateAccount,
    handleDeleteAccount,
    isResetting,
    isDeactivating,
    isActivating,
    isDeleting,
  } = useUsers(userId)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (!user) return <p>User not found</p>

  const onResetPassword = () => {
    toast.promise(handleResetPassword(userId), {
      loading: 'Sending password reset link...',
      success: (res: any) => res?.message ?? 'Password reset link sent!',
      error: (err: any) => {
        return err?.data?.message ?? err?.message ?? 'Error sending reset link'
      },
    })
  }

  const onDeactivate = () => {
    toast.promise(handleDeactivateAccount(userId), {
      loading: 'Deactivating account...',
      success: (res: any) =>
        res?.message ?? 'Account deactivated successfully!',
      error: (err: any) => {
        return (
          err?.data?.message ?? err?.message ?? 'Error deactivating account'
        )
      },
    })
  }

  const onActivate = () => {
    toast.promise(handleActivateAccount(userId), {
      loading: 'Activating account...',
      success: (res: any) => res?.message ?? 'Account activated successfully!',
      error: (err: any) => {
        return err?.data?.message ?? err?.message ?? 'Error activating account'
      },
    })
  }

  const onDelete = () => {
    toast.promise(handleDeleteAccount(userId), {
      loading: 'Deleting account...',
      success: (res: any) => res?.message ?? 'Account deleted successfully!',
      error: (err: any) => {
        return err?.data?.message ?? err?.message ?? 'Error deleting account'
      },
    })
  }

  return (
    <>
      <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
        {/* Header */}
        <CardHeader className='flex flex-row items-center justify-between px-6'>
          <CardTitle>System User</CardTitle>
          <Button
            className='gap-3'
            variant='outline'
            size='sm'
            onClick={() => {
              setSelectedUser(user || null)
              openModal()
            }}
          >
            <Pencil className='h-4 w-4' />
            Edit
          </Button>
        </CardHeader>

        {/* Body */}
        <CardContent className='px-6'>
          <div className='space-y-12'>
            {/* Email */}
            <div className='space-y-8'>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                  <Mail className='h-4 w-4' />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* Roles */}
              <p className='mb-3 text-xs font-medium uppercase'>Roles</p>
              <div className='space-y-3'>
                {user.roles?.length ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.roles.map((r) => (
                      <Badge className='rounded-md' key={r.id}>
                        {r.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span>No role assigned</span>
                )}
              </div>

              {/* Permissions */}
              <p className='mb-3 text-xs font-medium uppercase'>Permissions</p>
              <div className='space-y-3'>
                {user.permissions?.length ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.permissions.map((p) => (
                      <Badge className='rounded-md' key={p.id}>
                        {p.name
                          .replace(/-/g, ' ')
                          .replace(/:/g, ' ')
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span>No permission assigned</span>
                )}
              </div>
              <div className='space-y-3'>
                {/* Reset Password */}
                <div className='flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center'>
                  <div className='flex flex-col items-start text-sm'>
                    <p className='font-bold tracking-wide'>Reset Password</p>
                    <p className='font-medium text-muted-foreground'>
                      Send a password reset link to this user.
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      className='inline-flex cursor-pointer rounded-md border shadow-xs'
                      onClick={() => setOpenReset(true)}
                    >
                      Reset Password
                    </Button>
                    <ConfirmAlertDialog
                      open={openReset}
                      onOpenChange={setOpenReset}
                      title='Send Password Reset Link?'
                      description='A password reset link will be emailed to this user. Continue?'
                      confirmText='Send Link'
                      Icon={Mail}
                      onConfirm={onResetPassword}
                      isLoading={isResetting}
                    />
                  </div>
                </div>

                {/* Manage Account */}
                <div className='flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center'>
                  <div className='flex flex-col items-start text-sm'>
                    <p className='font-bold tracking-wide'>Manage Account</p>
                    <p className='font-medium text-muted-foreground'>
                      You can deactivate or permanently delete this account.
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      variant='secondary'
                      className='inline-flex cursor-pointer rounded-md border shadow-xs'
                      onClick={() => setOpenAlertDialog(true)}
                    >
                      {!user.isActive
                        ? 'Activate Account'
                        : 'Deactivate Account'}
                    </Button>
                    <ConfirmAlertDialog
                      open={openAlertDialog}
                      onOpenChange={setOpenAlertDialog}
                      title={
                        !user.isActive
                          ? 'Activate Account?'
                          : 'Deactivate Account?'
                      }
                      description={
                        !user.isActive
                          ? 'The user will regain access. Continue?'
                          : 'The user will lose access until reactivated. Continue?'
                      }
                      confirmText={!user.isActive ? 'Activate' : 'Deactivate'}
                      Icon={!user.isActive ? UserCheck : UserX}
                      onConfirm={!user.isActive ? onActivate : onDeactivate}
                      variant={!user.isActive ? 'secondary' : 'destructive'}
                      isLoading={!user.isActive ? isActivating : isDeactivating}
                    />

                    <Button
                      className='inline-flex cursor-pointer rounded-md border bg-destructive text-white shadow-xs hover:bg-destructive/90'
                      onClick={() => setOpenDelete(true)}
                    >
                      Delete Account
                    </Button>
                    <ConfirmAlertDialog
                      open={openDelete}
                      onOpenChange={setOpenDelete}
                      title='Delete Account?'
                      description='This action cannot be undone. The user will be permanently removed.'
                      confirmText='Delete'
                      Icon={Trash}
                      onConfirm={onDelete}
                      variant='destructive'
                      isLoading={isDeleting}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {isOpen && (
        <SystemUserFormModel
          staffId={staffId}
          defaultValues={selectedUser || undefined}
        />
      )}
    </>
  )
}
