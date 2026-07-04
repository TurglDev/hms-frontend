import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { ResetPasswordForm } from './components/reset-password-form'
import { Route } from '@/routes/(auth)/reset-password'
import { useAuths } from '../hooks/useAuths'
import { Loader2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function ResetPassword() {
  const { token } = Route.useSearch()

  const {
    verifyToken,
    isVerifyingToken,
   } = useAuths(token)

  return (
  <AuthLayout>
    {!token ? (
      // ❌ No token
      <Card>
        <CardContent className="py-10 text-center text-sm text-red-500">
          <p>Invalid password setup link</p>
          <Link
            to="/sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    ) : isVerifyingToken ? (
      <div className="flex justify-center py-10">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    ) : !verifyToken ? (
      <Card>
        <CardContent className="py-10 text-center text-sm text-red-500">
          <p>This password setup link is invalid or has expired.</p>
          <Link
            to="/sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    ) : (
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">
            Set Your Password
          </CardTitle>

          <CardDescription>
            Create a password to securely access the system.
            <br />
            This password will be used for all future logins.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    )}
  </AuthLayout>
);

}
