/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { loginSchema, type LoginFormValues } from '../../validation/auth.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import { useAuths } from '../../hooks/useAuths'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({ redirectTo }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const { handleLogin } = useAuths();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    toast.promise(
      async () => {
        return await handleLogin(values);
      },
      {
        loading: 'Signing in...',
        success: (res: any) => {
          setIsLoading(false)
          const authUser = {
            name: res.data.authUser.name,
            email: res.data.authUser.email,
            accountType: res.data.authUser.accountType,
            departments: ['user'],
            roles: res.data.authUser.roles,
            permissions: res.data.authUser.permissions,
            exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
          }

          // Set user and access token
          auth.setUser(authUser)
          auth.setAccessToken(res.data.accessToken)

          // Redirect to the stored location or default to dashboard
          const targetPath = redirectTo || '/'
          navigate({ to: targetPath, replace: true })

          return `Welcome back, ${values.email}!`
        },
        error: (err: any) => {
          setIsLoading(false)
          return err?.data?.message ?? err?.message ?? 'Error login'
        }
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
        
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className='relative'
              data-invalid={fieldState.invalid}
            >
              <div className='flex items-center justify-between'>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Link
                  to='/forgot-password'
                  className='text-sm font-medium text-muted-foreground hover:opacity-75'
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                {...field}
                id='password'
                aria-invalid={fieldState.invalid}
                placeholder='********'
                autoComplete='current-password'
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>
      </FieldGroup>
    </form>
  )
}
