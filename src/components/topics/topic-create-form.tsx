'use client'
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Textarea, Chip } from '@nextui-org/react'
import * as actions from '@/actions'
import React, { startTransition, useActionState } from 'react'

export default function TopicCreateForm() {
  const [state, formAction, isPending] = useActionState(actions.createTopic, {
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
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='secondary' variant='bordered' className='block ml-auto'>New Topics</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement='inside'
              isInvalid={!!state.errors.title}
              errorMessage={state.errors.title}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='inside'
              isInvalid={!!state.errors.content}
              errorMessage={state.errors.content}
            />
            {state.errors._form ?
              <Chip variant='bordered' radius='sm' className='max-w-full'>
                {state.errors._form.join(',')}
              </Chip> :
              null
            }
            <Button isLoading={ isPending } type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
