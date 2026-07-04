import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Pencil, Plus } from 'lucide-react'
import { useNextOfKin } from '@/features/next-of-kin/hooks/useNextOfKin'
import { useModal } from '@/hooks/modal/useModal'
import { useState } from 'react'
import type { NextOfKin } from '@/features/next-of-kin/types/next-of-kin.types'
import { NextOfKinFormModel } from '../models/next-of-kin-form-model'
import { Country, State } from 'country-state-city'

type NextOfKinTabProps = {
  staffId: string
  nextOfKinId: string
}

export function NextOfKinTab({ staffId, nextOfKinId }: NextOfKinTabProps) {
  const { isOpen, openModal } = useModal('next-of-kin-form')
  const { nextOfKin } = useNextOfKin(nextOfKinId)
  const [selectedNextOfKin, setSelectedNextOfKin] = useState<NextOfKin | null>(
    null
  )

  return (
    <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
      <CardHeader className='flex flex-row items-center justify-between px-6'>
        <CardTitle>Next of Kin</CardTitle>
        <>
          {nextOfKin ? (
            <Button
              className='gap-3'
              variant='outline'
              size='sm'
              onClick={() => {
                setSelectedNextOfKin(nextOfKin)
                openModal()
              }}
            >
              <Pencil className='h-4 w-4' />
              Edit
            </Button>
          ) : (
            <Button
              className='gap-3'
              variant='outline'
              size='sm'
              onClick={() => {
                setSelectedNextOfKin(null)
                openModal()
              }}
            >
              <Plus className='h-4 w-4' />
              Add
            </Button>
          )}
        </>
      </CardHeader>

      <CardContent className='px-6'>
        <div className='space-y-12'>
          {nextOfKin ? (
            <div className='space-y-4 lg:space-y-8'>
              <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                Emergency Contact Information
              </p>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground uppercase'>
                    Full Name:
                  </span>
                  <span>{nextOfKin.fullName}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground uppercase'>
                    Relationship:
                  </span>
                  <span>{nextOfKin.relationship}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground uppercase'>
                    Phone Number:
                  </span>
                  <span>{nextOfKin.phoneNumber}</span>
                </div>
              </div>

              {nextOfKin.address && (
                <>
                  <p className='mb-3 text-xs font-medium text-muted-foreground uppercase'>
                    Emergency Contact Address
                  </p>

                  <div className='flex items-start gap-2'>
                    <MapPin className='mt-1 h-4 w-4 text-muted-foreground' />

                    <div className='text-sm leading-tight'>
                      {/* Street */}
                      {[
                        nextOfKin.address.addressLine1,
                        nextOfKin.address.addressLine2,
                      ]
                        .filter(Boolean)
                        .join(', ')}

                      <br />

                      {/* City + State (resolved name) */}
                      {[
                        nextOfKin.address.city,
                        State.getStateByCodeAndCountry(
                          nextOfKin.address.state,
                          nextOfKin.address.country
                        )?.name,
                      ]
                        .filter(Boolean)
                        .join(', ')}

                      {/* Postal code */}
                      {nextOfKin.address.postalCode && (
                        <>
                          <br />
                          {nextOfKin.address.postalCode}
                        </>
                      )}

                      {/* Country (resolved name) */}
                      <br />
                      {
                        Country.getCountryByCode(nextOfKin.address.country)
                          ?.name
                      }
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p>No Emergency Contact Information</p>
          )}
        </div>
        {isOpen && (
          <NextOfKinFormModel
            staffId={staffId}
            defaultValues={selectedNextOfKin || undefined}
          />
        )}
      </CardContent>
    </Card>
  )
}
