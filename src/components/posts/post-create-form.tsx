'use client'
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Textarea, Chip } from '@nextui-org/react'
import { startTransition, useActionState } from 'react'
import * as actions from '@/actions'

interface PostCreateFormProps {
  name: string
}
export default function PostCreateForm({name}: PostCreateFormProps) {
  
    const [state, formAction, isPending] = useActionState(actions.createPost.bind(null, name), {
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
        <Button color='secondary' variant='bordered' className='block ml-auto'>New Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form noValidate onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Post</h3>
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
              isInvalid={!!state.errors.title}
              errorMessage={state.errors.title}
            />
            {state.errors._form ?
              <Chip variant='bordered' radius='sm' className='max-w-full'>
                {state.errors._form.join(',')}
              </Chip> :
              null
            }          
            <Button type='submit' isLoading={isPending}>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
