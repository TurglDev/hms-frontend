import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { useStaffs } from './hooks/useStaffs'
import { PersonalInfoCard } from './components/card/personal-info-card'
import { DepartmentCard } from './components/card/department-card'
import { AddressCard } from './components/card/address-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NextOfKinTab } from './components/tabs/next-of-kin-tab'
import { SystemUserTab } from './components/tabs/system-user-tab'
import { useParams } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/staffs/details'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StaffDetails() {
  const { id } = useParams({ from: Route.id })
  const { staff } = useStaffs(id)

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
            <h1 className="text-2xl font-bold">Staff Details</h1>
            <p className="text-muted-foreground">View staff details here.</p>
          </div>
        </div>
        <div className='w-full space-y-4'>
          {!staff ? (
            <div className="container mx-auto py-6 space-y-6">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-[600px] w-full" />
            </div>
          ) : (
            <div className='grid gap-4 xl:grid-cols-3'>
              <div className='space-y-4 xl:col-span-1'>
                <PersonalInfoCard staff={staff} />
                <DepartmentCard
                  staffId={staff.id}
                  departments={staff.departments ?? []}
                />
              </div>
              <div className='space-y-4 xl:col-span-2'>
                <AddressCard staffId={staff.id} addressId={staff.address!.id} />

                <Tabs defaultValue='next-of-kin'>
                  <TabsList>
                    <TabsTrigger value='next-of-kin'>Next of Kin</TabsTrigger>
                    {staff.user && (
                      <TabsTrigger value='system-user'>System User</TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value='next-of-kin'>
                    {staff.nextOfKin && (
                      <NextOfKinTab
                        staffId={staff.id}
                        nextOfKinId={staff.nextOfKin.id}
                      />
                    )}
                  </TabsContent>
                  {staff.user && (
                    <TabsContent value='system-user'>
                      <SystemUserTab staffId={staff.id} userId={staff.user.id} />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          )}
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
    title: 'Details',
    href: '/staffs/details',
    isActive: true,
    disabled: true,
  },
]
