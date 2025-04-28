'use server'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod' // 表单校验

interface CreateCommentFormState {
  errors: {
    content?: string[],
    _form?: string[]
  }
}

const rule = z.object({
  content: z.string().min(5).max(1000),
})

export async function createComment(
  { postId }: { postId: string },
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
        userId: session.user.id !,
        postId
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

  return {
    errors: {}
  }
}