import React from 'react'
import Image from 'next/image'

export default function CommentShow() {
  return (
    <div className='border mt-2 p-4 rounded'>
    <div className='flex gap-3'>
      <Image src='/avatar.jpg' alt='user avatar' width={40} height={40} className='w-10 h-10 rounded-full' />
      <div className='flex-1'>
        <p className='text-sm font-medium text-gray-500'>用户名</p>
        <p className='flex justify-between items-center'>
          <span className='flex-1 text-gray-900'>评论内容</span>
          <span className='w-[150px] text-right text-gray-400 text-sm'>2025-04-28 16:48:44</span>
        </p>
      </div>
    </div>
  </div>
  )
}
