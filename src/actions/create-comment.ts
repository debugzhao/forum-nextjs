'use server'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { findTopicByPostId } from '@/prisma/db/topics'
import { Post } from '@prisma/client'
import { th } from 'framer-motion/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod' // 表单校验

interface CreateCommentFormState {
  errors: {
    content?: string[],
    _form?: string[]
  },
  success?: boolean
}

const rule = z.object({
  content: z.string().min(5).max(1000),
})

export async function createComment(
  { postId, parentId }: { postId: string, parentId: string },
  prevState: CreateCommentFormState,
  formData: FormData): Promise<CreateCommentFormState> {

  const content = formData.get('content')

  const result = rule.safeParse({ content })
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  // 登录判断
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['you must login first']
      }
    }
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id!,
        postId,
        parentId
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['something went wrong, please try again']
        }
      }
    }
  }

  // 根据帖子id查询帖子属于哪个话题，然后拿到topicNam
  // 最终得到完整的url
  // 重新验证数据，目的是重新渲染评论列表

  const topic = await findTopicByPostId(postId)
  if (!topic) {
    throw new Error('topic not found')
  }
  console.log('topic', topic)

  revalidatePath(`/topics/${topic.name}/posts/${postId}`)

  return {
    errors: {},
    success: true
  }
}