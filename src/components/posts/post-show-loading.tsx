import { Skeleton } from '@nextui-org/react'
import React from 'react'

export default function PostShowLoading() {
  return (
    <div>
      <div className='my-2'>
        <Skeleton className='h-8 w-48 rounded' />
      </div>
      <div className='p-4 border rounded'>
        <Skeleton className='h-8 w-48 rounded' />
      </div>
    </div>
  )
}
