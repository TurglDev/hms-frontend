import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'
import { usePatientCards } from '../../hooks/usePatientCards'
import { AddressCard } from '../../components/card/address-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams } from '@tanstack/react-router'
import { PatientInfoCard } from '@/features/patient/components/card/patient-info-card'
import { usePatients } from '@/features/patient/hooks/usePatients'
import { NextOfKinTab } from '../../components/tabs/next-of-kin-tab'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import { HealthRecordTab } from '@/features/patient/components/tabs/health-record-tab'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { CreateHealthRecord } from '@/features/health-record/create'
import { DocumentTab } from '@/features/patient/components/tabs/documents-tab'

export function PatientCardDetails() {
  const { patientCardId, patientId } = useParams({
    from: '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId',
  })

  const { patientCard } = usePatientCards(patientCardId)
  const { patient } = usePatients(patientId, patientCardId)

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
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' onClick={() => history.back()}>
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <div>
              <h1 className='text-2xl font-bold'>Patient Card Details</h1>
              <p className='text-muted-foreground'>
                View patient card details here.
              </p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='shadow-sm'>
                <Plus className='mr-2 h-4 w-4' />
                New Health Record
              </Button>
            </SheetTrigger>
            <CreateHealthRecord
              patientCardId={patientCardId}
              cardNumber={patientCard?.patientCardUUID ?? ''}
              patientId={patientId}
            />
          </Sheet>
        </div>
        <div className='w-full space-y-4'>
          {!patientCard || !patient ? (
            <div className='container mx-auto space-y-6 py-6'>
              <Skeleton className='h-10 w-48' />
              <Skeleton className='h-[600px] w-full' />
            </div>
          ) : (
            <div className='grid gap-4 xl:grid-cols-3'>
              <div className='space-y-4 xl:col-span-1'>
                <PatientInfoCard patientCard={patientCard} patient={patient} />
                <AddressCard
                  patientCardId={patientCard.id}
                  addressId={patientCard.address!.id}
                />
              </div>
              <div className='space-y-4 xl:col-span-2'>
                <Tabs defaultValue='health-records'>
                  <TabsList>
                    <TabsTrigger value='health-records'>
                      Health Records
                    </TabsTrigger>
                    <TabsTrigger value='documents'>Documents</TabsTrigger>
                    {patientCard.cardType == 'individual' && (
                      <TabsTrigger value='emergency-contact'>
                        Emergency Contact
                      </TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value='health-records'>
                    <HealthRecordTab
                      patientCardId={patientCard.id}
                      cardNumber={patientCard?.patientCardUUID ?? ''}
                      patientId={patientId}
                    />
                  </TabsContent>
                  <TabsContent value='documents'>
                    <DocumentTab
                      patientCardId={patientCard.id}
                      patientId={patientId}
                    />
                  </TabsContent>
                  {patientCard.cardType == 'individual' && (
                    <TabsContent value='emergency-contact'>
                      <NextOfKinTab
                        patientCardId={patientCard.id}
                        nextOfKinId={patientCard.nextOfKin!.id}
                      />
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
