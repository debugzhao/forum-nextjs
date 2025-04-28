import React from 'react'
import CommentShow from './comment-show'


export default function CommentList() {
  return (
    <div className='space-y-3'>
      <h1 className='text-lg font-bold'>All 20 comments</h1>
      <CommentShow />
    </div>
  )
}
