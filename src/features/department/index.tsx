import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

import { TopNav } from '@/components/layout/top-nav'
import { DepartmentsPrimaryButtons } from './components/department-primary-buttons'
import { DepartmentsProvider } from './components/departments-provider'
import { useDepartments } from './hooks/useDepartments'
import { DepartmentsTable } from './components/departments-table'
import { DepartmentsDialogs } from './components/departments-dialogs'

const route = getRouteApi('/_authenticated/departments/')

export function Departments() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const { departments } = useDepartments();

  return (
    <DepartmentsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Department List</h2>
            <p className='text-muted-foreground'>
              Manage your departments here.
            </p>
          </div>
          <DepartmentsPrimaryButtons />
        </div>

        <DepartmentsTable data={departments} search={search} navigate={navigate} />
      </Main>

      <DepartmentsDialogs />
    </DepartmentsProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  }
]
