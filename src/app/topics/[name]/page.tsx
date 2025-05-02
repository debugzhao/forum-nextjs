"use client"

import PostCreateForm from '@/components/posts/post-create-form'
import PostList from '@/components/posts/post-list'
import { fetchPostsByTopicName } from '@/prisma/db/posts'
import React from 'react'
interface TopicShowPageType {
  params: Promise<{ name: string }>
}


export default async function TopicShowPage({ params }: TopicShowPageType) {
  const { name } = await params

  const postListRsp = await fetchPostsByTopicName(name)

  return (
    <div className='flex justify-between'>
      {/* w-3/5表示宽度是父盒子的3/5 */}
      <div className='w-3/5'>
        <h1 className='text-xl mt-2'>{name}</h1>
        <PostList posts={postListRsp}/>
      </div>
      <div>
        <PostCreateForm name={name}/>
      </div>
    </div>
  )
}
