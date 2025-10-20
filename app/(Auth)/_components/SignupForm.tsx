import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button className='w-full'>{pending && <Loader2 className='animate-spin' />}SignUp</Button>
    )
}

export default function SignupForm() {
    const router = useRouter()
    const [state, signUpAction] = useFormState(signUp, null)

    useEffect(() => {
        if (state?.errorMessage) {
            toast.error(state.errorMessage)
        }
        else if (state?.errorMessage === null) {
            toast.success("Signed Up, Please check your email")
            router.replace("/")
        }
    }, [state, router])

    return (
        <form action={signUpAction}>
            <CardContent className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' name='email' placeholder='Enter your email' required />
                </div>

                <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' name='password' placeholder='Enter your password' required />
                }

            </CardContent>
            <CardFooter className='flex flex-col gap-6 mt-4'>
                <SubmitButton />
                <p className='text-xs'>
                    Already have an account? <Link href="/login" className='text-blue-500 cursor-pointer'>Login</Link>
                </p>
            </CardFooter>
        </form>