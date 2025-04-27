import PostList from '@/components/posts/post-list'
import TopicCreateForm from '@/components/topics/topic-create-form'
import TopicList from '@/components/topics/topic-list'
import { fetchTopPosts } from '@/prisma/db/posts'
import React from 'react'

export default async function Page() {
  const posts = await fetchTopPosts()
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-2xl'>Top Posts</h1>
        <PostList posts={posts} />
      </div>
      <div>
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  )
}