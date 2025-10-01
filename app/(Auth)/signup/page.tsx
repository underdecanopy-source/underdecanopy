import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SignupForm from '../_components/SignupForm'

export default function page() {
    return (
        <div className='mt-20 flex flex-col flex-1 items-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='mb-4'>
                    <CardTitle className='text-center text-3xl'>
                        Sign Up
                        <SignupForm />
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}
