import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import type { Staff } from '../../types/staff.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { Pencil, User, VenusAndMars, Calendar, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/modal/useModal'
import { useState } from 'react'
import { StaffFormModel } from '../models/staff-form-model'

type PersonalInfoCardProps = {
  staff: Staff
}

export function PersonalInfoCard({ staff }: PersonalInfoCardProps) {
  const { isOpen, openModal } = useModal('edit-staff-form')
  const [selectedStaff, setSelectedStaff] = useState<Staff>()

  const initials = `${staff.firstName[0] || ''}${staff.lastName[0] || ''}`

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
                setSelectedStaff(staff)
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
                {staff.photo ? (
                  <AvatarImage
                    src={staff.photo}
                    alt={`${staff.firstName} ${staff.lastName}`}
                  />
                ) : (
                  <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div className='text-center'>
                <h5 className='items-center gap-2 text-xl font-semibold'>
                  {staff.firstName} {staff.lastName}
                </h5>
                <div className='text-sm text-muted-foreground'>
                  {staff.staffUUID}
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
                      {staff.firstName} {staff.lastName}
                    </span>
                  </div>
                  <div className='flex items-center gap-3 text-sm'>
                    <VenusAndMars className='h-4 w-4 text-muted-foreground' />
                    <span className='capitalize'>{staff.gender}</span>
                  </div>
                  <div className='flex items-center gap-3 text-sm'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span>
                      {staff.dateOfBirth
                        ? format(new Date(staff.dateOfBirth), 'dd MMM yyyy')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </>
              <>
                <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                  Contact
                </p>
                <div className='space-y-3'>
                  {staff.email && (
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <Mail className='h-4 w-4' aria-hidden='true' />
                      <span>{staff.email}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-3 text-sm'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <span>{staff.phoneNumber}</span>
                  </div>
                </div>
              </>
              {/* <>
                        <div className="flex flex-row items-center justify-between">
                          <p className="text-muted-foreground text-xs font-medium uppercase">Department</p>
                          <Button
                            className="gap-3"
                            variant="outline"
                            size="sm"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" aria-hidden="true" />
                            {staff.departments && staff.departments.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {staff.departments.map((dept) => (
                                  <Badge className="rounded-md" key={dept.id}>{dept.name}</Badge>
                                ))}
                              </div>
                            ) : (
                              <span>No department</span>
                            )}
                            </div>
                          
                        </div>
                      </> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {isOpen && selectedStaff && (
        <StaffFormModel defaultValues={selectedStaff} />
      )}
    </>
  )
}
