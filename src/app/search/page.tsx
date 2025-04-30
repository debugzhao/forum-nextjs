import PostList from '@/components/posts/post-list'
import { fetchPostBySearchValue } from '@/prisma/db/posts'
import { redirect } from 'next/navigation'
import React from 'react'

interface SearchPageProps {
  searchParams: Promise<{ name: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {
  const { name } = await searchParams
  if (!name) {
    redirect('/')
  }

  const posts = await fetchPostBySearchValue(name)
  console.log(posts)

  return (
    <PostList posts={posts} />
  )
}
