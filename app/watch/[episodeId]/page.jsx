'use client'

import { useEffect } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import axios from '../../lib/api'
import { useRouter } from 'next/navigation'

export default function WatchPage({ params }) {
  const { episodeId } = params
  const router = useRouter()

  // We fetch episode details client-side to allow normal hydration
  const [episode, setEpisode] = React.useState(null)

  useEffect(()=>{
    let mounted = true
    axios.get(`/episodes/${episodeId}`).then(r=>{ if(mounted) setEpisode(r.data) }).catch(()=>{})

    // track watch when page loaded
    axios.post('/watch/track', { episode_id: episodeId }).catch(()=>{})

    return ()=> mounted = false
  }, [episodeId])

  if (!episode) return <div className="card p-6">Loading episode...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
      <VideoPlayer src={episode.video_url} poster={episode.poster || '/default-cover.jpg'} />
    </div>
  )
}
