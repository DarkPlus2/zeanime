// pages/movies.tsx
import useSWR from 'swr'
import AnimeCard from '../components/AnimeCard'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function Movies(){
  const {data} = useSWR('/api/animes', fetcher)
  const movies = (data||[]).filter((a:any)=>a.type==='movie')
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies ? movies.map((a:any)=> <AnimeCard key={a.id} anime={a} />) : 'Loading...'}
      </div>
    </section>
  )
}
