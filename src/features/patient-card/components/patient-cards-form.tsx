/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { usePatientCards } from '../hooks/usePatientCards'
import { toast } from 'sonner'
import {
  patientCardSchema,
  type PatientCardFormValues,
} from '../validation/patient-card.schema'
import { useEffect, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  UserCheck,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Patient } from '@/features/patient/types/patient.types'
import { BasicInfoStep } from './steps/basic-info-step'
import { MemberStep } from './steps/member-step'
import { AddressFields } from '@/features/address/components/address-fields'
import { NextOfKinFields } from '@/features/next-of-kin/components/next-of-kin-fields'
import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'

const getStepData = (cardType: string) => {
  const steps = [
    {
      label: 'Personal Information',
      description: 'Add Personal Info',
      icon: User,
    },
    {
      label: 'Address',
      description: 'Setup Account Details',
      icon: UserCheck,
    },
    {
      label: 'Member',
      description: 'Setup Member Details',
      icon: UserCheck,
      show: cardType === 'family',
    },
    {
      label: 'Next Of Kin',
      description: 'Add Personal Info',
      icon: Users,
      show: cardType !== 'family',
    },
  ]

  return steps.filter((step) => step.show !== false)
}

interface PatientCardsFormProps {
  cardType: string
  onChangeCardType: () => void
}

export function PatientCardsForm({ 
  cardType,
  onChangeCardType
}: PatientCardsFormProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedMembers, setSelectedMembers] = useState<Patient[]>([])

  const { handleCreate, isCreating } = usePatientCards()

  const form = useForm<PatientCardFormValues>({
    resolver: zodResolver(patientCardSchema),
    defaultValues: {
      cardType: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      patients:
        cardType === 'individual'
          ? [
              {
                firstName: '',
                lastName: '',
                middleName: '',
                gender: '',
                dateOfBirth: undefined,
              },
            ]
          : [],
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
      nextOfKin:
        cardType === 'individual'
          ? {
              fullName: '',
              relationship: '',
              phoneNumber: '',
            }
          : undefined,
    },
    mode: 'onChange',
  })

  form.setValue('cardType', cardType);

  const firstName = form.watch('patients.0.firstName');
  const lastName = form.watch('patients.0.lastName');

  useEffect(() => {
    if (cardType === 'individual' && firstName && lastName) {
      form.setValue('fullName', `${firstName} ${lastName}`, {
        shouldValidate: true,
      });
    }
  }, [cardType, firstName, lastName, form]);

  const stepFields: (keyof PatientCardFormValues)[][] =
    cardType === 'individual'
      ? [['cardType', 'fullName', 'phoneNumber', 'patients'], ['address'], ['nextOfKin']]
      : [['cardType', 'fullName', 'phoneNumber'], ['address'], []]

  const handleNext = async () => {
    const valid = await form.trigger(stepFields[step], { shouldFocus: true })
    if (!valid) return
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const onSubmit = (values: PatientCardFormValues) => {
    try {
      toast.promise(
        async () => {
          if (cardType !== 'individual' && selectedMembers.length > 0) {
            values.patients = [...selectedMembers]
          }
          return await handleCreate(values)
        },
        {
          loading: 'Creating patient card...',
          success: (res: any) => {
            form.reset()
            navigate({
              to: '/patient-cards',
            })
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ?? err?.message ?? 'Error creating patient card'
        }
      )
    } catch (error) {
      console.error('Patient card creation/updating failed', error)
    }
  }

  const StepIndicator = () => (
    <div className='mb-6 justify-center'>
      <div className='mb-2 flex items-center justify-between'>
        {cardType &&
          getStepData(cardType).map((stepInfo, index) => {
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
          style={{
            width: `${
              cardType ? ((step + 1) / getStepData(cardType).length) * 100 : 0
            }%`,
          }}
        />
      </div>
    </div>
  )

  const renderInfoStep = () => {
    return <BasicInfoStep cardType={cardType} form={form} />
  }

  const renderMemberStep = () => {
    return (
      <MemberStep
        form={form}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
    )
  }

  const renderAddressStep = () => {
    return <AddressFields form={form} fieldName='address' />
  }

  const renderNextOfKinStep = () => {
    return <NextOfKinFields 
      form={form} 
      fieldName='nextOfKin' 
      addressFieldsRequired={false}
      />
  }

  const renderFormFields = () => {
    switch (cardType) {
      case 'individual':
        return (
          <div className='space-y-4'>
            <StepIndicator />
            <div className='space-y-6'>
              {step === 0 && renderInfoStep()}
              {step === 1 && renderAddressStep()}
              {step === 2 && renderNextOfKinStep()}
            </div>
          </div>
        )

      case 'family':
        return (
          <div className='space-y-4'>
            <StepIndicator />
            <div className='space-y-6'>
              {step === 0 && renderInfoStep()}
              {step === 1 && renderAddressStep()}
              {step === 2 && renderMemberStep()}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      key='form'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className='mt-4'
    >
      <div className='mx-auto max-w-3xl lg:pt-10'>
        <form
          id='patient-card-form'
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className='space-y-4'
        >
          {renderFormFields()}
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
                onClick={onChangeCardType}
              >
                Change Card Type
              </Button>
            )}

            {cardType && step < getStepData(cardType).length - 1 ? (
              <Button type='button' onClick={handleNext}>
                Next <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            ) : (
              <Button
                type='button'
                form='patient-card-form'
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting && isCreating}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  )
}
