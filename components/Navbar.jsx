'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getToken, clearToken } from '../lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar(){
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(()=> setToken(getToken()), [])

  const logout = ()=>{ clearToken(); router.push('/') }

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">ZeeAnime</Link>
        <div className="flex items-center gap-3">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          {token && <button onClick={logout} className="ml-2 px-3 py-1 rounded bg-neutral-700">Logout</button>}
        </div>
      </div>
    </nav>
  )
}
