'use client'

import { useState } from 'react'
import axios from '../../lib/api'
import { setToken } from '../../lib/auth'
import { useRouter } from 'next/navigation'

export default function Register(){
  const [u, setU] = useState('')
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  const submit = async (ev)=>{
    ev.preventDefault()
    try{
      const r = await axios.post('/auth/register', { username: u, email: e, password: p })
      setToken(r.data.token)
      router.push('/')
    }catch(err){ setErr(err?.response?.data?.message || 'Register failed') }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl font-bold mb-4">Create account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={u} onChange={ev=>setU(ev.target.value)} className="w-full p-2 rounded bg-neutral-700" placeholder="Username" />
        <input value={e} onChange={ev=>setE(ev.target.value)} className="w-full p-2 rounded bg-neutral-700" placeholder="Email" />
        <input type="password" value={p} onChange={ev=>setP(ev.target.value)} className="w-full p-2 rounded bg-neutral-700" placeholder="Password" />
        <button className="w-full py-2 rounded bg-accent">Register</button>
        {err && <div className="text-sm text-red-400">{err}</div>}
      </form>
    </div>
  )
}
