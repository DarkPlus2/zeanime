'use client'

import { useState } from 'react'
import axios from '../../lib/api'
import { setToken } from '../../lib/auth'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const r = await axios.post('/auth/login', { email, password })
      const { token } = r.data
      setToken(token)
      router.push('/')
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded bg-neutral-700" placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 rounded bg-neutral-700" placeholder="Password" />
        <button className="w-full py-2 rounded bg-accent">Sign in</button>
        {err && <div className="text-sm text-red-400">{err}</div>}
      </form>
    </div>
  )
}
