import React from 'react'
import CommentShow from './comment-show'
import { fetchCommentByPostId } from '@/prisma/db/comment'

interface CommentListProps {
  postId: string
}

export default async function CommentList({ postId }: CommentListProps) {

  const commentList = await fetchCommentByPostId(postId)
  console.log('commentList', commentList)

  return (
    <div className='space-y-3'>
      <h1 className='text-lg font-bold'>All 20 comments</h1>
      {
        commentList.map(comment => <CommentShow key={comment.id} comment={comment} />)
      }
    </div>
  )
}
