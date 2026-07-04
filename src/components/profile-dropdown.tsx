/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useLocation } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuths } from '@/features/auth/hooks/useAuths'
import { toast } from 'sonner'

export function ProfileDropdown() {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuthStore()
  const { handleLogout } = useAuths();
  
  const user = auth.user

  const handleSignOut = () => {
    toast.promise(
      async () => {
        return await handleLogout();
      },
      {
        loading: 'Signing out...',
        success: (res: any) => {

          auth.reset()

          const currentPath = location.pathname + location.search
          navigate({
            to: '/sign-in',
            search: { redirect: currentPath },
            replace: true,
          })

          return res?.message
        },
        error: (err: any) => {
          return err?.data?.message ?? err?.message ?? 'Error login'
        }
      }
    )    
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>{auth?.user?.name}</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive' onClick={() => handleSignOut()}>
            Sign out
            <DropdownMenuShortcut className='text-current'>
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
