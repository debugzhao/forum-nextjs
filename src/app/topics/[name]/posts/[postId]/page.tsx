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

  return (
    <>
    </>
  )
}
