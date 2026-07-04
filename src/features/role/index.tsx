import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { RolesPrimaryButtons } from './components/role-primary-buttons'
import { RolesProvider } from './components/roles-provider'
import { useRoles } from './hooks/useRoles'
import { RolesTable } from './components/roles-table'
import { RolesDialogs } from './components/roles-dialogs'

const route = getRouteApi('/_authenticated/roles/')

export function Roles() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const { roles } = useRoles();

  return (
    <RolesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Role List</h2>
            <p className='text-muted-foreground'>
              Manage your roles here.
            </p>
          </div>
          <RolesPrimaryButtons />
        </div>

        <RolesTable data={roles} search={search} navigate={navigate} />
      </Main>

      <RolesDialogs />
    </RolesProvider>
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
