import React from 'react'
import Image from 'next/image'
import { CommentWithUser, fetchCommentByPostId } from '@/prisma/db/comment'
import dayjs from 'dayjs'
import CommentCreateForm from './comment-create-form'


export default async function CommentShow({ comment }: { comment: CommentWithUser }) {
  const comments = await fetchCommentByPostId(comment.postId || '')

  return (
    <div className='border mt-2 p-4 rounded'>
      <div className='flex gap-3'>
        <Image
          src={comment.User?.image || '/avatar.jpg'}
          alt='user avatar'
          width={40}
          height={40}
          className='w-10 h-10 rounded-full'
        />
        <div className='flex-1 space-y-3'>
          <p className='text-sm font-medium text-gray-500'>{comment.User?.name}</p>
          <p className='flex justify-between items-center'>
            <span className='flex-1 text-gray-900'>{comment.content}</span>
            <span className='w-[150px] text-right text-gray-400 text-sm'>{dayjs(comment.createdAt).format('YYYY/M/D H:m:s')}</span>
          </p>

          <CommentCreateForm postId={comment.postId || ''} parentId={comment.id} />
        </div>
      </div>

      {
        comments
          .filter(item => item.parentId === comment.id)
          .map(comment => <CommentShow key={comment.id} comment={comment} />)
      }
    </div>
  )
}
