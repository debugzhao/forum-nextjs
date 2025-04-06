'use client'
import { useSession } from "next-auth/react"
 
export default function UserInfoClient() {
  const { data: session } = useSession()
 
  if (!session?.user) return null
 
  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <img src={session.user.image || ""} alt="User Avatar" />
    </div>
  )
}