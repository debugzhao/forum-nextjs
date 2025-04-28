'use client'

import { Button, Chip, Textarea } from '@nextui-org/react'
import React, { startTransition, useActionState } from 'react'
import * as actions from '@/actions/create-comment'

interface CommentCreateFormProps {
  postId: string
}

export default function CommentCreateForm({ postId }: CommentCreateFormProps) {
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

  return (
    <form className='space-y-3' onSubmit={handleSubmit} noValidate>
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
