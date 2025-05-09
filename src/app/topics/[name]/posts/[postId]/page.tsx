import CommentCreateForm from '@/components/comments/comment-create-form'
import CommentList from '@/components/comments/comment-list'
import PostShow from '@/components/posts/post-show'
import PostShowLoading from '@/components/posts/post-show-loading'
import { Suspense } from 'react'

interface PostDetailType {
  params: Promise<{
    name: string
    postId: string
  }>
}

export default async function PostDetail({ params }: PostDetailType) {
  // 获取路由参数
  const { postId } = await params

  return (
    <div className='space-y-3'>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} isOpen />

      <CommentList postId={postId} />
    </div>
  )
}
