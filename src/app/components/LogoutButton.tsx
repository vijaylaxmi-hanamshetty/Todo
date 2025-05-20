'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }

    checkSession()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  if (!isLoggedIn) return null

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md ml-4"
    >
      Log Out
    </button>
  )
}
