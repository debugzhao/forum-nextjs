import { findPostById } from '@/prisma/db/posts'
import { div } from 'framer-motion/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface PostDetailType {
  params: {
    name: string
    postId: string
  }
}

export default async function PostDetail({ params }: PostDetailType) {
  // 获取路由参数
  const {name, postId} = await params

  const post = await findPostById(postId)
  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className='text-2xl font-bold my-2'>{post.title}</h1>
      <h1 className='p-4 border rounded'>{post.content}</h1>
    </div>
  )
}
