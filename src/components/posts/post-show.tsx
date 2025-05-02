import { findPostById } from '@/prisma/db/posts'
import { notFound } from 'next/navigation'

interface PostShowProps {
  postId: string
}

export default async function PostShow({ postId }: PostShowProps) {
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
