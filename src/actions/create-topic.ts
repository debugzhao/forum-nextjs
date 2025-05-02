'use server'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { Topic } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod' // 表单校验

interface CreateTopicFormState {
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

export async function createTopic(prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {

  const title = formData.get('title')
  const content = formData.get('content')

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

  let topic: Topic
  // 登录成功之后，保存表单相关数据
  try {
    topic = await prisma.topic.create({
      data: {
        name: result.data.title,
        description: result.data.content,
        userId: session.user.id!
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

  // 重新验证首页缓存
  // revalidatePath('/')

  // 添加成功则跳转到详情页面
  redirect(`/topics/${encodeURIComponent(topic.name)}`)

  return {
    errors: {}
  }
}