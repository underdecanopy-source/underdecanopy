"use client"
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/lib/actions/auth'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

export default function LoginForm() {
    const router = useRouter()
    const [state, loginAction, isPending] = useActionState(login, null)

    useEffect(() => {
        if (state?.errorMessage) {
            toast.error(state.errorMessage)
        }
        else if (state?.errorMessage === null) {
            toast.success("Logged In")
            router.replace("/")
        }
    }, [state])

    return (
        <form action={loginAction}>
            <CardContent className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' placeholder='Enter your email' required />
                </div>

                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' placeholder='Enter your password' required />
                </div>

            </CardContent>
            <CardFooter className='flex flex-col gap-6 mt-4'>
                <Button className='w-full'>{isPending && <Loader2 className='animate-spin' />}Login</Button>
                <p className='text-xs'>
                    Dont have an account? <Link href="/signup" className='text-blue-500 cursor-pointer'>Signup</Link>
                </p>
            </CardFooter>
        </form>
    )
}
