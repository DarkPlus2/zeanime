// pages/series.tsx
import useSWR from 'swr'
import AnimeCard from '../components/AnimeCard'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function Series(){
  const {data} = useSWR('/api/animes', fetcher)
  const series = (data||[]).filter((a:any)=>a.type==='series')
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Series</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {series ? series.map((a:any)=> <AnimeCard key={a.id} anime={a} />) : 'Loading...'}
      </div>
    </section>
  )
}
