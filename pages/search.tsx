// pages/search.tsx
import { useState } from 'react'
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function Search(){
  const [q, setQ] = useState('')
  const { data, mutate } = useSWR(q ? `/api/animes?q=${encodeURIComponent(q)}` : null, fetcher)

  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title or genre" className="w-full mb-4 p-3 rounded bg-panel"/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data ? data.map((a:any)=>(<div key={a.id} className="card p-2"><a href={`/watch/${a.id}`}>{a.title}</a></div>)) : q ? 'Searching...' : 'Type to search'}
      </div>
    </section>
  )
}
