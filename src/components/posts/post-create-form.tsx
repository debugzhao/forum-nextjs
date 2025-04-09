'use client'
import { Button, Popover, PopoverTrigger, PopoverContent, Input, Textarea } from '@nextui-org/react'

interface PostCreateFormProps {
  name: string
}
export default function PostCreateForm({name}: PostCreateFormProps) {
  console.log("🚀 ~ PostCreateForm ~ name:", name)

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='secondary' variant='bordered' className='block ml-auto'>New Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form noValidate>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Post</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement='inside'
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='inside'
            />
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
