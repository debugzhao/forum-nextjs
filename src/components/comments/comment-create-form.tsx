'use client'

import { Button, Chip, Textarea } from '@nextui-org/react'
import React, { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import * as actions from '@/actions/create-comment'

interface CommentCreateFormProps {
  postId: string,
  isOpen?: boolean
}

export default function CommentCreateForm({ postId, isOpen }: CommentCreateFormProps) {
  const [state, formAction, isPending] = useActionState(actions.createComment.bind(null, { postId }), {
    errors: {}
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    startTransition(() => {
      formAction(formData)
    })
  }

  // form表单引用
  const formRef = useRef<HTMLFormElement | null>(null)
  // 监听state变化，如果state发生变化则清空表单
  useEffect(() => {
    if (state.success) {
      // 重置表单
      formRef.current?.reset()
    }
  }, [state])

  const [open, setOpen] = useState(isOpen || false)

  return (
    <div className='space-y-3'>
      <Button color='default' variant='shadow' size='sm' onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {
        open && (
          <form className='space-y-3' onSubmit={handleSubmit} noValidate ref={formRef}>
            <Textarea
              name='content'
              label='Reply'
              labelPlacement='inside'
              placeholder='Reply to this post'
              isInvalid={!!state.errors.content}
              errorMessage={state.errors.content}
            />
            {state.errors._form ?
              <Chip variant='bordered' radius='sm' className='max-w-full'>
                {state.errors._form.join(',')}
              </Chip> :
              null
            }
            <Button
              isLoading={isPending}
              color='secondary'
              variant='bordered'
              type='submit'
            >
              Create Comment
            </Button>
          </form>
        )
      }
    </div>
  )
}
