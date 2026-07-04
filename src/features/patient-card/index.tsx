import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { UserPlus } from 'lucide-react'
import { PatientCardsTable } from './components/patient-cards-table'

// const route = getRouteApi('/_authenticated/patient-cards/')

export function PatientCardsList() {
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
            <h2 className='text-2xl font-bold tracking-tight'>
              Patient Card List
            </h2>
            <p className='text-muted-foreground'>
              Manage your patient cards here.
            </p>
          </div>
          <div className='flex gap-2'>
            <Link
              to='/patient-cards/create'
              className='inline-flex items-center gap-2 space-x-1 rounded-md bg-primary px-4 py-2 shadow-sm text-sm font-medium text-primary-foreground'
            >
              <UserPlus className='mr-2 h-4 w-4' />
              Add Patient Card
              
            </Link>
          </div>
        </div>

        <PatientCardsTable />
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
    title: 'Patient Cards',
    href: '/patient-cards',
    isActive: true,
    disabled: true,
  },
]
