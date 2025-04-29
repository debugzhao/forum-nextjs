import { redirect } from 'next/navigation'
import React from 'react'

interface SearchPageProps {
  searchParams: Promise<{ name: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {
  const { name } = await searchParams
  if (!name) {
    redirect('/')
  }
  return (
    <div>
      {name}
    </div>
  )
}
