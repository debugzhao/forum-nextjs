import CommentCreateForm from '@/components/comments/comment-create-form'
import PostShow from '@/components/posts/post-show'
import PostShowLoading from '@/components/posts/post-show-loading'
import { Suspense } from 'react'

interface PostDetailType {
  params: {
    name: string
    postId: string
  }
}

export default async function PostDetail({ params }: PostDetailType) {
  // 获取路由参数
  const { name, postId } = await params

  return (
    <div className='space-y-3'>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} />
    </div>
  )
}
