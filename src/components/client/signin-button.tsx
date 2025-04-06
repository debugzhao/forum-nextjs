"use client"
import { signIn } from "next-auth/react"
 
export default function SignInButtonClient() {
  return (
    <button onClick={() => signIn("github")}>
      Sign In Client
    </button>
  )
}