import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { HeartPulse } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { HealthRecordFormValues } from '../../validation/health-record.schema'
import { Textarea } from '@/components/ui/textarea'

interface VitalSignFormProps {
  form: UseFormReturn<HealthRecordFormValues>
}

export function VitalSignForm({ form }: VitalSignFormProps) {
  return (
    <Card className='gap-0'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <HeartPulse className='h-5 w-5 text-primary' />
          Vital Signs
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6'>
          {/* Temperature */}
          <Controller
            name='vitalSign.temperature'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='temperature'>Temp</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='temperature'
                    placeholder='98.6'
                    step='0.1'
                    className='pr-10'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    °F
                  </span>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Blood Pressure */}
          <Controller
            name='vitalSign.bloodPressure'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='bloodPressure'>BP</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    id='bloodPressure'
                    placeholder='120/80'
                    className='pr-10'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    mmHg
                  </span>
                </div>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* Pulse */}
          <Controller
            name='vitalSign.heartRate'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='heartRate'>Pulse</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='heartRate'
                    placeholder='72'
                    className='pr-12'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    bpm
                  </span>
                </div>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* Respiratory Rate */}
          <Controller
            name='vitalSign.respiratoryRate'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='respiratoryRate'>RR</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='respiratoryRate'
                    placeholder='16'
                    className='pr-12'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    /min
                  </span>
                </div>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* SpO₂ */}
          <Controller
            name='vitalSign.oxygenSaturation'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='oxygenSaturation'>SpO₂</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='oxygenSaturation'
                    placeholder='98'
                    className='pr-8'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    %
                  </span>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Weight */}
          <Controller
            name='vitalSign.weight'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='weight'>Weight</FieldLabel>

                <div className='relative'>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='weight'
                    placeholder='70'
                    step='0.1'
                    className='pr-10'
                  />

                  <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground'>
                    kg
                  </span>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
            name='vitalSign.vitalSignNote'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Additional Notes</FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Enter additional vital sign notes...'
                  className='min-h-[80px] resize-none'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
      </CardContent>
    </Card>
  )
}
