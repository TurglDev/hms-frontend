import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Header } from '@/components/layout/header'
import { ThemeSwitch } from '@/components/theme-switch'
import { Activity, CreditCard, Mars, TrendingUp, Users, Venus } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useDashboards } from './hooks/useDashboards'



export function Dashboard() {
  const { auth } = useAuthStore()

  const { 
    totalPatientCards, 
    totalPatients, 
    totalMalePatient,
    totalFemalePatient,
    isLoadingPatientCard, 
    isLoadingPatient,
    isLoadingMalePatient,
    isLoadingFemalePatient,
  } = useDashboards()

  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>
            Welcome back, {auth?.user?.name}!
          </h1>
          <p className='text-muted-foreground'>
            Here's what's happening at your hospital today.
          </p>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Patient Cards
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{isLoadingPatientCard ? "—" : totalPatientCards}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Patients
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{isLoadingPatient ? "—" : totalPatients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Male Patients
              </CardTitle>
              <Mars className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{isLoadingMalePatient ? "—" : totalMalePatient}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Female Patients
              </CardTitle>
              <Venus className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{isLoadingFemalePatient ? "—" : totalFemalePatient}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">No recent activity to display.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Complete setup to view statistics.</p>
          </CardContent>
        </Card>
      </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Dashboard',
    href: 'dashboard',
    isActive: true,
    disabled: false,
  },
]
