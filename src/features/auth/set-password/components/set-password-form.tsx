/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { PasswordInput } from '@/components/password-input'
import {
  setPasswordSchema,
  type SetPasswordFormValues,
} from '../../validation/auth.schema'
import { useNavigate } from '@tanstack/react-router'
import { useAuths } from '../../hooks/useAuths'

interface SetPasswordFormProps {
  token: string
}

export function SetPasswordForm({ token }: SetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { handleSetPassword } = useAuths()

  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: SetPasswordFormValues) => {
    if (!token) {
      toast.error('Invalid or missing password setup token')
      return
    }
    setIsLoading(true)
    toast.promise(
      async () => {
        values.token = token
        return await handleSetPassword(values)
      },
      {
        loading: 'Setting Password...',
        success: (res: any) => {
          setIsLoading(false)

          navigate({ to: '/', replace: true })

          return res?.message ?? 'Password set successfully'
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
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <PasswordInput
                {...field}
                id='password'
                aria-invalid={fieldState.invalid}
                placeholder='********'
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='confirmPassword'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <PasswordInput
                {...field}
                id='confirmPassword'
                aria-invalid={fieldState.invalid}
                placeholder='********'
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className='mt-2' disabled={isLoading}>
          Set Password
        </Button>
      </FieldGroup>
    </form>
  )
}
