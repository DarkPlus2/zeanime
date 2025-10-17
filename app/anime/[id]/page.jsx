import axios from '../../../lib/api'
import EpisodeList from '../../../components/EpisodeList'

export default async function AnimePage({ params }) {
  const id = params.id
  const res = await axios.get(`/anime/${id}`)
  const anime = res.data

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="card p-4">
          <div className="w-full h-80 cover" style={{ backgroundImage: `url(${anime.cover_image || '/default-cover.jpg'})` }} />
          <h1 className="text-2xl font-bold mt-4">{anime.title}</h1>
          <p className="text-sm text-neutral-300 mt-2">{anime.genre}</p>
          <p className="mt-4 text-neutral-200">{anime.description}</p>
        </div>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Episodes</h2>
        <EpisodeList episodes={anime.episodes || []} animeId={anime.id} />
      </div>
    </div>
  )
}
