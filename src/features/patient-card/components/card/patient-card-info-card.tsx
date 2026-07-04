import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import type { PatientCard } from '../../types/patient-card.types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Pencil, User, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal/useModal'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { PatientCardFormModel } from '../models/patient-card-form-model'

type PatientCardInfoCardProps = {
  patientCard: PatientCard
}

export function PatientCardInfoCard({ patientCard }: PatientCardInfoCardProps) {
  const { isOpen, openModal } = useModal('edit-patient-card-form')
  const [selectedPatientCard, setSelectedPatientCard] = useState<PatientCard>()

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
                setSelectedPatientCard(patientCard)
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
                <AvatarFallback>{patientCard.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className='text-center'>
                <h5 className='items-center gap-2 text-xl font-semibold'>
                  {patientCard.fullName}
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
                    <span>{patientCard.fullName}</span>
                  </div>
                </div>
              </>
              <>
                <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                  Contact
                </p>
                <div className='space-y-3'>
                  {patientCard?.email && (
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <Mail className='h-4 w-4' aria-hidden='true' />
                      <span>{patientCard.email}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-3 text-sm'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <span>{patientCard.phoneNumber}</span>
                  </div>
                </div>
              </>
            </div>
          </div>
        </CardContent>
      </Card>
      {isOpen && selectedPatientCard && (
        <PatientCardFormModel 
          defaultValues={selectedPatientCard}
        />
      )}
    </>
  )
}
