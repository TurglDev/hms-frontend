import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { usePatientCards } from '../hooks/usePatientCards'
import { PatientCardInfoCard } from '../components/card/patient-card-info-card'
import { AddressCard } from '../components/card/address-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocumentTab } from '../components/tabs/documents-tab'
import { MembersTab } from '../components/tabs/members-tab'
import { useParams } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'


export function PatientCardDetails() {

  const { patientCardId } = useParams({ from: '/_authenticated/patient-cards/details/$patientCardId' })

  const { patientCard } = usePatientCards(patientCardId)

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
            <h1 className="text-2xl font-bold">Patient Card Details</h1>
            <p className="text-muted-foreground">View patient card details here.</p>
          </div>
        </div>
        <div className='w-full space-y-4'>
          {!patientCard ? (
            <div className="container mx-auto py-6 space-y-6">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-[600px] w-full" />
            </div>
          ) : (
            <div className='grid gap-4 xl:grid-cols-3'>
              <div className='space-y-4 xl:col-span-1'>
                <PatientCardInfoCard 
                  patientCard={patientCard} 
                />
                <AddressCard
                  patientCardId={patientCard.id}
                  addressId={patientCard.address!.id}
                />
              </div>
              <div className='space-y-4 xl:col-span-2'>
                <Tabs defaultValue= 'members'>
                  <TabsList>
                    <TabsTrigger value='members'>Members</TabsTrigger>
                    <TabsTrigger value='documents'>Documents</TabsTrigger>
                  </TabsList>
                  <TabsContent value='members'>
                    <MembersTab patientCardId={patientCard.id} />
                  </TabsContent>
                  <TabsContent value='documents'>
                    <DocumentTab 
                      patientCardId={patientCard.id}
                    />
                  </TabsContent>
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
    title: 'Patient Cards',
    href: '/patient-cards',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Details',
    href: '/patient-cards/details',
    isActive: true,
    disabled: true,
  },
]
