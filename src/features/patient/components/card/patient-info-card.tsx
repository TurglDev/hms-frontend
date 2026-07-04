import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import type { Patient } from '../../types/patient.types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Pencil, User, Mail, Phone, Calendar, Mars, Venus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal/useModal'
import { useState } from 'react'
import type { PatientCard } from '@/features/patient-card/types/patient-card.types'
import { Badge } from '@/components/ui/badge'
import { calculateAge } from '@/lib/utils'

type PatientCardInfoCardProps = {
  patientCard: PatientCard,
  patient: Patient
}

export function PatientInfoCard({ 
  patientCard,
  patient 
}: PatientCardInfoCardProps) {
  const { isOpen, openModal } = useModal('edit-patient-form')
  const [selectedPatient, setSelectedPatient] = useState<Patient>()

  const initials = `${patient.firstName[0] || ''}${patient.lastName[0] || ''}`
  const age = calculateAge(patient.dateOfBirth)

  return (
    <>
      <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
        <CardHeader>
          <CardAction>
            <Button
              className='gap-3'
              variant='outline'
              size='sm'
              onClick={() => {
                setSelectedPatient(patient)
                openModal()
              }}
            >
              <Pencil className='h-4 w-4' />
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='px-6'>
          <div className='space-y-12'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='relative flex size-20 shrink-0 overflow-hidden rounded-full'>
                <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='text-center'>
                <h5 className='items-center gap-2 text-xl font-semibold'>
                  {patient.firstName} {patient.lastName}
                </h5>
                <div className='text-sm text-muted-foreground'>
                  {patientCard.patientCardUUID}
                </div>
                <div className='text-sm text-muted-foreground'>
                  <Badge variant='outline' className='p-1 pr-2'>
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
                      alt='Hallie Richards'
                      className='size-6 rounded-full'
                    />
                    {patientCard?.cardType}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='space-y-4 lg:space-y-8'>
              <>
                <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                  About
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-sm'>
                    <User className='h-4 w-4 text-muted-foreground' />
                    <span>
                      {patient.firstName} {patient.middleName}{' '}
                      {patient.lastName}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 text-sm'>
                    {patient.gender.toLowerCase() === 'male' ? (
                      <Mars className='h-4 w-4 text-blue-500' />
                    ) : patient.gender.toLowerCase() === 'female' ? (
                      <Venus className='h-4 w-4 text-pink-500' />
                    ) : null}
                    <span className='capitalize'>{patient.gender}</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span>
                      {age}
                    </span>
                  </div>
                </div>
              </>
              <>
                <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                  Contact
                </p>
                <div className='space-y-3'>
                  {patientCard.email && (
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <Mail className='h-4 w-4' aria-hidden='true' />
                      <span>{patientCard.email}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-3 text-sm'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <span>{patient.phoneNumber || patientCard.phoneNumber}</span>
                  </div>
                </div>
              </>
            </div>
          </div>
        </CardContent>
      </Card>
      {isOpen && selectedPatient && (
        <></>
      )}
    </>
  )
}
