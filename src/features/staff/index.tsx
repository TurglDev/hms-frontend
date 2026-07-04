import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { StaffsTable } from './components/staffs-table'
import { UserPlus } from 'lucide-react'

// const route = getRouteApi('/_authenticated/staffs/')

export function StaffsList() {
  
  // const search = route.useSearch()
  // const navigate = route.useNavigate()

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
       
            <div className='flex flex-wrap items-end justify-between gap-2'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>Staff List</h2>
                <p className='text-muted-foreground'>
                  Manage your staffs here.
                </p>
              </div>
              <div className='flex gap-2'>
                <Link
                  to='/staffs/create'
                  className="inline-flex items-center px-4 py-2 gap-2 bg-primary text-primary-foreground text-sm font-medium rounded-md space-x-1"
                >
                  Add Staff
                  <UserPlus size={18} />
                </Link>
              </div>
            </div>

            <StaffsTable />
          
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
    isActive: true,
    disabled: true,
  }
]
