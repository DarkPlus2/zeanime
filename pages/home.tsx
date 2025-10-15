// pages/home.tsx
import useSWR from 'swr'
import AnimeCard from '../components/AnimeCard'

const fetcher = (u:string)=> fetch(u).then(r=>r.json())

export default function Home(){
  const {data, error} = useSWR('/api/animes', fetcher)

  if(error) return <div className="container py-20">Failed to load</div>
  if(!data) return <div className="container py-20">Loading...</div>

  return (
    <section className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Trending on Zeanime</h1>
        <p className="text-gray-400">Latest & most popular anime</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.slice(0,12).map((a:any)=> <AnimeCard key={a.id} anime={a} />)}
      </div>
    </section>
  )
}
