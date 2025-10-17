import Link from 'next/link'

export default function EpisodeList({ episodes = [], animeId }){
  if (!episodes.length) return <div className="text-neutral-400">No episodes yet</div>

  return (
    <div className="space-y-2">
      {episodes.map(ep => (
        <div key={ep.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded">
          <div>
            <div className="font-semibold">Ep {ep.episode_number} — {ep.title}</div>
            <div className="text-sm text-neutral-400">{ep.created_at ? new Date(ep.created_at).toLocaleDateString() : ''}</div>
          </div>
          <Link href={`/watch/${ep.id}`} className="px-3 py-1 rounded bg-accent">Watch</Link>
        </div>
      ))}
    </div>
  )
}
