import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SignupForm from '../_components/SignupForm'

type SignupPageProps = {
    searchParams: {
        next?: string
    }
}

export default function page({ searchParams }: SignupPageProps) {
    return (
        <div className='mt-20 flex flex-col flex-1 items-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='mb-4'>
                    <CardTitle className='text-center text-3xl'>
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <SignupForm redirectTo={searchParams.next} />
            </Card>
        </div>
    )
}
