/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../../validation/auth.schema'
import { useNavigate } from '@tanstack/react-router'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useAuths } from '../../hooks/useAuths'


export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { handleForgotPassword } = useAuths()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
      toast.promise(
        async () => {
          return await handleForgotPassword(values)
        },
        {
          loading: 'Sending reset link...',
          success: (res: any) => {
            setIsLoading(false)
  
            navigate({ to: '/', replace: true })
  
            return res?.message ?? 'Password reset link sent successfully'
          },
          error: (err: any) => {
            setIsLoading(false)
            return err?.data?.message || err?.message || 'Error login'
        },
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='grid gap-3'>
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                {...field}
                id='email'
                aria-invalid={fieldState.invalid}
                placeholder='name@example.com'
                autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className='mt-2' disabled={isLoading}>
          Continue
          {isLoading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
        </Button>
      </FieldGroup>
    </form>
  )
}
