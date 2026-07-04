import { Controller, type UseFormReturn } from 'react-hook-form'
import type { StaffFormValues } from '../../validation/staff.schema'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { CalendarIcon, Pencil, Upload, UserCircle2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { AddressFields } from '@/features/address/components/address-fields'

type PersonalInfoStepProps = {
  form: UseFormReturn<StaffFormValues>
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  return (
    <div className='flex items-start gap-8'>
      <div className='top-4'>
        <Controller
          name='photo'
          control={form.control}
          render={({
            field: { name, onChange, value, ...fieldProps },
            fieldState,
          }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className='group relative'>
                <div className='h-30 w-30 overflow-hidden rounded-full border-4 border-muted-foreground/10 bg-muted shadow-lg transition-all duration-300 group-hover:border-primary/30'>
                  {value && typeof value === 'object' ? (
                    <img
                      src={URL.createObjectURL(value)}
                      alt='Profile Preview'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-muted'>
                      <UserCircle2 className='h-20 w-20 text-muted-foreground/50' />
                    </div>
                  )}
                </div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <FieldLabel
                    htmlFor='photo'
                    className={cn(
                      buttonVariants({ variant: 'default', size: 'sm' }),
                      'cursor-pointer gap-2 px-6'
                    )}
                  >
                    {value ? (
                      <Pencil className='h-5 w-5 rounded-full bg-primary/80 p-1 text-white' />
                    ) : (
                      <Upload className='h-5 w-5 rounded-full bg-primary/80 p-1 text-white' />
                    )}
                  </FieldLabel>
                </div>
              </div>

              <Input
                id={name}
                aria-invalid={fieldState.invalid}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      return toast('File too large', {
                        description: 'Please upload an image smaller than 5MB',
                      })
                    }
                    if (!file.type.startsWith('image/')) {
                      return toast('Invalid file type', {
                        description:
                          'Please upload an image file (JPG, PNG, etc.)',
                      })
                    }
                    onChange(file)
                  }
                }}
                {...fieldProps}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className='w-2/2 space-y-6'>
        <div className='flex flex-col items-start'>
          <h3 className='text-xl font-semibold'>Personal Information</h3>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Controller
            name='firstName'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='firstName'>First Name</FieldLabel>
                <Input
                  {...field}
                  id='firstName'
                  aria-invalid={fieldState.invalid}
                  placeholder='First Name'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='lastName'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='lastName'>Last Name</FieldLabel>
                <Input
                  {...field}
                  id='lastName'
                  aria-invalid={fieldState.invalid}
                  placeholder='Last Name'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='middleName'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='middleName'>Middle Name</FieldLabel>
                <Input
                  {...field}
                  id='middleName'
                  aria-invalid={fieldState.invalid}
                  placeholder='Middle Name'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='gender'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='gender'>Gender</FieldLabel>
                <Select
                  {...field}
                  aria-invalid={fieldState.invalid}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='dateOfBirth'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='dateOfBirth'>Date of birth</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      captionLayout='dropdown'
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='phoneNumber'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='phoneNumber'>Phone Number</FieldLabel>
                <PhoneInput
                  {...field}
                  id='phoneNumber'
                  aria-invalid={fieldState.invalid}
                  defaultCountry='NG'
                  placeholder='Enter a phone number'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='text-xl font-semibold'>Address</h3>
        </div>
        <AddressFields form={form} fieldName='address' />
      </div>
    </div>
  )
}
