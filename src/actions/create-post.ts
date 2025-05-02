'use server'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod' // 表单校验

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[],
    _form?: string[]
  }
}

const rule = z.object({
  title: z.string().min(3),
  content: z.string().min(5).max(1000),
})

export async function createPost(
  name: string,
  prevState: CreatePostFormState,
  formData: FormData) : Promise<CreatePostFormState> {

  const title = formData.get('title')
  const content  = formData.get('content')

  const result = rule.safeParse({ title, content })
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

  // 从数据库中根据topicName查询topicId
  const topic = await prisma.topic.findFirst({
    where: {
      name
    },
  })
  if (!topic) {
    return {
      errors: {
        _form: ['topic not found']
      }
    }
  }

  let post: Post
  // 登录成功之后，保存表单相关数据
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id!,
        topicId: topic.id
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

  // 添加成功则跳转到详情页面
  redirect(`/topics/${topic.name}/posts/${post.id}`)

  return {
    errors: {}
  }
}