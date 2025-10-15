// pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index(){
  const r = useRouter()
  useEffect(()=>{ r.replace('/home') }, [r])
  return <div className="container py-20 text-center">Redirecting to Home...</div>
}
