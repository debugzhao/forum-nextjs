"use client"
import { signOut } from "next-auth/react"
 
export default function SignOutButtonClient() {
  return <button onClick={() => signOut()}>Sign Out Client</button>
}