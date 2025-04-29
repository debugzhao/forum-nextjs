
'use server'
import { redirect } from "next/navigation"

export async function search(formData: FormData) {
  const name = formData.get('name')
  if (!name || typeof name !== 'string') {
    // 重定向到首页
    redirect('/')
  }

  redirect(`/search?name=${name}`)
}