import PostCreateForm from '@/components/posts/post-create-form'
import React from 'react'
interface TopicShowPageType {
  params: Promise<{ name: string }>
}


export default async function TopicShowPage({ params }: TopicShowPageType) {
  const { name } = await params
  return (
    <div className='flex justify-between'>
      <div className='text-xl mt-2'>
        <h1>top post</h1>
      </div>
      <div>
        <PostCreateForm />
      </div>
    </div>
  )
}
