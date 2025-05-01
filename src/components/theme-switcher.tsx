'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className='hover:cursor-pointer'
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </div>
  )
}

export default ThemeSwitch