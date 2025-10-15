// pages/watch/[id].tsx
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Player from '../../components/Player'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function Watch(){
  const router = useRouter()
  const { id } = router.query
  const { data: anime } = useSWR(id ? `/api/animes/${id}` : null, fetcher)

  if(!anime) return <div className="container py-20">Loading...</div>

  // choose first episode & first server by default
  const ep = anime.episodes && anime.episodes.length ? anime.episodes[0] : null
  const server = ep && ep.servers && ep.servers.length ? ep.servers[0] : null

  return (
    <section className="container py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {server?.type === 'embed' ? (
            <iframe src={server.url} frameBorder={0} allowFullScreen style={{width:'100%', height:560}} />
          ) : (
            <Player server={server} />
          )}
          <h2 className="text-2xl font-bold mt-4">{anime.title} — {ep?.title}</h2>
          <p className="text-gray-400 mt-2">{anime.qtip || anime.description}</p>
        </div>
        <aside>
          <div className="card p-4">
            <h3 className="font-semibold">Episodes</h3>
            <div className="mt-3 space-y-2">
              {anime.episodes?.map((e:any)=>(
                <a key={e.id} className="block p-2 rounded hover:bg-gray-800" href={`/watch/${anime.id}?ep=${e.id}`}>
                  S{e.season}E{e.episode_number} — {e.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
