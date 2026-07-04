import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { StaffForm } from './components/staffs-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function CreateStaff() {

  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Staff</h1>
            <p className="text-muted-foreground">Create new user here.</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <StaffForm />
        </div>
      </Main>

    </>
  )
}

const topNav = [
  {
    title: 'Dashboard',
    href: '/',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Staffs',
    href: '/staffs',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Create',
    href: '/staffs/create',
    isActive: true,
    disabled: true,
  }
]
