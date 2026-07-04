import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import type { Address } from '@/features/address/types/address.types'
import { useModal } from '@/hooks/modal/useModal'
import { AddressFormModel } from '../models/address-form-model'
import { Country, State } from 'country-state-city'

type AddressCardProps = {
  staffId: string
  addressId: string
}

export function AddressCard({ staffId, addressId }: AddressCardProps) {
  const { isOpen, openModal } = useModal('address-form')
  const { address } = useAddresses(addressId)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

  return (
    <>
      <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
        <CardHeader className='flex flex-row items-center justify-between px-6'>
          <CardTitle>Address</CardTitle>
          <>
            {address ? (
              <Button
                className='gap-3'
                variant='outline'
                size='sm'
                onClick={() => {
                  setSelectedAddress(address)
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
                  setSelectedAddress(null)
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
            <div className='space-y-4 lg:space-y-8'>
              <div className='flex items-start gap-2'>
                <MapPin className='mt-1 h-4 w-4 text-muted-foreground' />

                <div className='text-sm leading-tight'>
                  {address ? (
                    <>
                      {/* Street */}
                      {[address.addressLine1, address.addressLine2]
                        .filter(Boolean)
                        .join(', ')}

                      <br />

                      {/* City + State (resolved name) */}
                      {[
                        address.city,
                        State.getStateByCodeAndCountry(
                          address.state,
                          address.country
                        )?.name,
                      ]
                        .filter(Boolean)
                        .join(', ')}

                      {/* Postal code */}
                      {address.postalCode && (
                        <>
                          <br />
                          {address.postalCode}
                        </>
                      )}

                      {/* Country (resolved name) */}
                      <br />
                      {Country.getCountryByCode(address.country)?.name}
                    </>
                  ) : (
                    <span>No Address</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isOpen && (
        <AddressFormModel
          staffId={staffId}
          defaultValues={selectedAddress || undefined}
        />
      )}
    </>
  )
}
