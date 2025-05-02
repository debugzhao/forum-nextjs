import { fetchTopics } from '@/prisma/db/topics'
import { Badge, Chip } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const ListBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-[300px] p-3 rounded-small border-2 mt-4 flex gap-3 flex-wrap'>
      {children}
    </div>
  )
}

export default async function TopicList() {
  const topicList = await fetchTopics()

  return (
    <ListBoxWrapper>
      {
        topicList.map(item => {
          return (
            <Badge key={item.id} content={item._count.posts} color='danger' variant='shadow' shape='circle' size='sm'>
              <Chip color="secondary">
                <Link href={`/topics/${item.name}`}>{item.name}</Link>
              </Chip>
            </Badge>
          )
        })
      }
    </ListBoxWrapper>
  )
}

