'use client'
import { PostWithData } from '@/prisma/db/posts'
import { Avatar, Listbox, ListboxItem } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page({ posts }: { posts: PostWithData[] }) {
	const router = useRouter()

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
								startContent={post.User?.image && <div><Avatar src={post.User.image} className='w-8 h-8' /></div>}
								endContent={
									<span className="text-small text-gray-400 whitespace-nowrap self-end">{post._count.comments} comments</span>
								}
								onPress={() => {
									router.push(`/topics/${post.topic?.name}/posts/${post.id}`)
								}}
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