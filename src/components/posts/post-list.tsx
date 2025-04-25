import { PostWithData } from '@/prisma/db/posts'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { th } from 'framer-motion/client'
import React from 'react'

export default function Page({ posts }: {posts: PostWithData[]}) {
  return (
    <div>
	    <Listbox
		    aria-label="Post list"
		    itemClasses={{
			    base: "border-small border-default-200 mt-4",
		    }}
	    >
			{
				posts.map(post => {
					if (!post.topic?.name) {
						throw new Error('Post topic name is not defined')
					}

					return (
						<ListboxItem
							key={post.id}
							description={<p className="text-small mt-3">{post.User?.name}</p>}
							endContent={
								<span className="text-small text-gray-400 whitespace-nowrap self-end">{post._count.comments} comments</span>
							}
						>
							{post.title}
						</ListboxItem>
					)
				})
			}
	    </Listbox>
    </div>
  )
}