import Link from 'next/link'

export default function AnimeCard({ anime }){
  return (
    <Link href={`/anime/${anime.id}`} className="card p-2">
      <div className="w-full h-40 cover rounded-md" style={{ backgroundImage: `url(${anime.cover_image || '/default-cover.jpg'})` }} />
      <h3 className="mt-2 text-lg font-semibold">{anime.title}</h3>
      <p className="text-sm text-neutral-400">{anime.genre}</p>
    </Link>
  )
}
