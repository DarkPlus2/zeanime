// pages/catalog.tsx
import useSWR from 'swr'
import AnimeCard from '../components/AnimeCard'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function Catalog(){
  const {data} = useSWR('/api/animes', fetcher)
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Catalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data ? data.map((a:any)=> <AnimeCard key={a.id} anime={a} />) : 'Loading...'}
      </div>
    </section>
  )
}
