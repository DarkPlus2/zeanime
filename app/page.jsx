'use client'

import { useQuery } from '@tanstack/react-query'
import AnimeCard from '../components/AnimeCard'
import axios from '../lib/api'
import { motion } from 'framer-motion'

export default function Home() {
  const { data: trending = [], isLoading } = useQuery(['trending'], async () => {
    const res = await axios.get('/analytics/trending')
    return res.data
  })

  const { data: latest = [] } = useQuery(['latest'], async () => {
    const res = await axios.get('/anime')
    return res.data
  })

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Trending</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? new Array(4).fill(0).map((_,i)=>(<div key={i} className="card h-48 animate-pulse"/>)) : trending.map(a=> (
            <AnimeCard key={a.id} anime={a} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Latest</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latest.map(a=> <AnimeCard key={a.id} anime={a} />)}
        </div>
      </section>
    </div>
  )
}
