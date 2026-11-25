'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/actions/auth'
import { getSafeRedirectPath } from '@/lib/auth/redirect'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button className='w-full'>
            {pending ? <Loader2 className='animate-spin mr-2' /> : null}
            {pending ? 'Signing Up...' : 'SignUp'}
        </Button>
    )
}

type SignupFormProps = {
    redirectTo?: string
}

export default function SignupForm({ redirectTo }: SignupFormProps) {
    const router = useRouter()
    const [state, signUpAction] = useFormState(signUp, null)
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (state?.errorMessage) {
                toast.error(state.errorMessage)
                setFormError(state.errorMessage)
            }
            else if (state?.errorMessage === null) {
                toast.success("Signed Up, Please check your email")
                router.replace(`/login?next=${encodeURIComponent(getSafeRedirectPath(redirectTo))}`)
            }
        }
    }, [state, router, redirectTo])

    return (
        <form action={signUpAction} onSubmit={(event) => {
            const form = new FormData(event.currentTarget)
            if (form.get('password') !== form.get('confirmPassword')) {
                event.preventDefault()
                setFormError('Passwords do not match')
                toast.error('Passwords do not match')
            } else {
                setFormError('')
            }
        }}>
            <CardContent className='grid w-full items-center gap-4'>
                {formError && (
                    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {formError}
                    </p>
                )}
                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' placeholder='Enter your email' required />
                </div>

                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' placeholder='Enter your password' minLength={6} required />
                </div>

                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input type='password' name='confirmPassword' placeholder='Confirm your password' minLength={6} required />
                </div>

            </CardContent>
            <CardFooter className='flex flex-col gap-6 mt-4'>
                <SubmitButton />
                <p className='text-xs'>
                    Already have an account? <Link href={`/login?next=${encodeURIComponent(getSafeRedirectPath(redirectTo))}`} className='text-blue-500 cursor-pointer'>Login</Link>
                </p>
            </CardFooter>
        </form>
    )
}