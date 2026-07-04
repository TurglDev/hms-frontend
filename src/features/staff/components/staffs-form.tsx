/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { useStaffs } from '../hooks/useStaffs'
import { toast } from 'sonner'
import { staffSchema, type StaffFormValues } from '../validation/staff.schema'
import { useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  UserCheck,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PersonalInfoStep } from './steps/personal-info-step'
import { SystemUserStep } from './steps/system-user-step'
import { NextOfKinFields } from '@/features/next-of-kin/components/next-of-kin-fields'
import { useNavigate } from '@tanstack/react-router'

const stepData = [
  {
    label: 'Personal Information',
    description: 'Add Personal Info',
    icon: User,
  },
  {
    label: 'Account Details',
    description: 'Setup Account Details',
    icon: UserCheck,
  },
  { label: 'Next Of Kin', description: 'Add Personal Info', icon: Users },
]

export function StaffForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const { handleCreate, isCreating } = useStaffs()

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      gender: '',
      dateOfBirth: undefined,
      phoneNumber: '',
      email: '',
      photo: '',
      departments: [],
      user: {
        systemUser: false,
        roles: [],
        permissions: [],
      },
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
      nextOfKin: {
        fullName: '',
        phoneNumber: '',
        relationship: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          postalCode: '',
        },
      },
    },
    mode: 'onChange',
  })

  const stepFields: (keyof StaffFormValues)[][] = [
    [
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'phoneNumber',
      'address',
    ],
    ['email', 'departments', 'user'],
    ['nextOfKin'],
  ]

  const handleNext = async () => {
    const valid = await form.trigger(stepFields[step], { shouldFocus: true })
    if (!valid) return
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const onSubmit = async (values: StaffFormValues) => {
    try {
      toast.promise(
        async () => {
          return await handleCreate(values)
        },
        {
          loading: 'Creating staff...',
          success: (res: any) => {
            form.reset()
            navigate({
              to: '/staffs',
            })
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ?? err?.message ?? 'Error creating staff',
        }
      )
    } catch (error) {
      console.error('Staff creation/updating failed', error)
    }
  }

  const StepIndicator = () => (
    <div className='mb-6 justify-center'>
      <div className='mb-2 flex items-center justify-between'>
        {stepData.map((stepInfo, index) => {
          const Icon = stepInfo.icon
          const isCompleted = index < step
          const isActive = index === step

          return (
            <div
              key={stepInfo.label}
              className='relative flex flex-1 flex-col items-center'
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                  isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className='h-5 w-5' />
                ) : (
                  <Icon className='h-5 w-5' />
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-center text-xs',
                  isActive
                    ? 'font-medium text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {stepInfo.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className='relative h-2 overflow-hidden rounded-full bg-gray-200'>
        <div
          className='absolute top-0 left-0 h-2 rounded-full bg-primary transition-all duration-300'
          style={{ width: `${((step + 1) / stepData.length) * 100}%` }}
        />
      </div>
    </div>
  )

  const renderPersonalInfoStep = () => {
    return <PersonalInfoStep form={form} />
  }

  const renderSystemUserStep = () => {
    return <SystemUserStep form={form} />
  }

  const renderNextOfKinStep = () => (
    <NextOfKinFields 
      form={form} 
      fieldName='nextOfKin' 
      addressFieldsRequired={true}
      />
  )

  return (
    <div className='mx-auto max-w-3xl lg:pt-1'>
      <StepIndicator />

      <form
        id='staff-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FieldGroup>
          <div className='space-y-6'>
            {step === 0 && renderPersonalInfoStep()}
            {step === 1 && renderSystemUserStep()}
            {step === 2 && renderNextOfKinStep()}
          </div>
        </FieldGroup>

        {/* Navigation */}
        <div className='mt-8 flex justify-between'>
          {step > 0 ? (
            <Button
              type='button'
              variant='outline'
              onClick={handleBack}
              disabled={form.formState.isSubmitting}
            >
              <ChevronLeft className='mr-2 h-4 w-4' /> Back
            </Button>
          ) : (
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          )}

          {step < stepData.length - 1 ? (
            <Button type='button' onClick={handleNext}>
              Next <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          ) : (
            <Button
              type='button'
              form='staff-form'
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting || isCreating}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
