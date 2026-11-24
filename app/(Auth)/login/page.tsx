import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import LoginForm from '../_components/LoginForm'

type LoginPageProps = {
  searchParams: {
    next?: string
  }
}

export default function page({ searchParams }: LoginPageProps) {
  return (
    <div className='mt-20 flex flex-col flex-1 items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader className='mb-4'>
          <CardTitle className='text-center text-3xl'>
            Login
          </CardTitle>
        </CardHeader>
        <LoginForm redirectTo={searchParams.next} />
      </Card>
    </div>
  )
}
