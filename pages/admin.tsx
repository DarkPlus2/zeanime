// pages/admin.tsx
import { useState, useEffect } from 'react'

export default function Admin(){
  const [key, setKey] = useState<string | null>(null)
  useEffect(()=>{ setKey(localStorage.getItem('adminKey')) }, [])
  const login = ()=>{ const k = prompt('Enter admin key'); if(k){ localStorage.setItem('adminKey', k); setKey(k)} }

  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Zeanime Admin</h1>
      {!key ? (
        <div>
          <p>Not logged in</p>
          <button className="btn mt-3" onClick={login}>Login</button>
        </div>
      ) : (
        <>
          <AddAnimeForm />
          <AddEpisodeForm />
          <ScheduleForm />
        </>
      )}
    </section>
  )
}

function AddAnimeForm(){
  const [loading,setLoading]=useState(false)
  async function onSubmit(e:any){
    e.preventDefault()
    const fd = new FormData(e.target)
    const doc:any = {
      title: fd.get('title'), slug: fd.get('slug'), poster: fd.get('poster'),
      description: fd.get('description'), genres: fd.get('genres') ? fd.get('genres').split(',').map((s:string)=>s.trim()) : [],
      type: fd.get('type'), hindi_dub: fd.get('hindi') ? true : false
    }
    setLoading(true)
    try{
      await fetch('/api/animes', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'x-admin-key': localStorage.getItem('adminKey')||'' },
        body: JSON.stringify(doc)
      })
      alert('Anime added')
      e.target.reset()
    }catch(e){ alert('Failed') }
    setLoading(false)
  }
  return (
    <form className="card p-4 mb-4" onSubmit={onSubmit}>
      <h3 className="font-semibold mb-2">Add Anime</h3>
      <input name="title" placeholder="Title" className="w-full p-2 mb-2 bg-panel rounded" required/>
      <input name="slug" placeholder="Slug" className="w-full p-2 mb-2 bg-panel rounded" />
      <input name="poster" placeholder="Poster URL" className="w-full p-2 mb-2 bg-panel rounded" />
      <input name="genres" placeholder="Genres (comma separated)" className="w-full p-2 mb-2 bg-panel rounded" />
      <textarea name="description" placeholder="Description" className="w-full p-2 mb-2 bg-panel rounded" />
      <div className="flex gap-2 items-center mb-2">
        <select name="type" className="p-2 bg-panel rounded">
          <option value="series">Series</option>
          <option value="movie">Movie</option>
        </select>
        <label className="ml-4"><input type="checkbox" name="hindi" /> Hindi Dub</label>
      </div>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Anime'}</button>
    </form>
  )
}

function AddEpisodeForm(){
  const [animes,setAnimes]=useState<any[]>([])
  useEffect(()=>{ fetch('/api/animes').then(r=>r.json()).then(setAnimes) },[])
  async function onSubmit(e:any){
    e.preventDefault()
    const fd = new FormData(e.target)
    const doc:any = {
      anime_id: fd.get('anime_id'),
      season: Number(fd.get('season')||1),
      episode_number: Number(fd.get('episode_number')),
      title: fd.get('title'),
      servers: [
        {id:'abyss', name:'Abyss', type:'embed', url: fd.get('abyss')},
        {id:'filemoon', name:'Filemoon', type:'embed', url: fd.get('filemoon')}
      ]
    }
    await fetch('/api/episodes', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'x-admin-key': localStorage.getItem('adminKey')||'' },
      body: JSON.stringify(doc)
    })
    alert('Episode added')
    e.target.reset()
  }
  return (
    <form className="card p-4 mb-4" onSubmit={onSubmit}>
      <h3 className="font-semibold mb-2">Add Episode</h3>
      <select name="anime_id" className="w-full p-2 mb-2 bg-panel rounded">
        {animes.map(a=> <option key={a.id} value={a.id}>{a.title}</option>)}
      </select>
      <input name="season" placeholder="Season" className="w-1/4 p-2 mb-2 bg-panel rounded" />
      <input name="episode_number" placeholder="Episode #" className="w-1/4 p-2 mb-2 bg-panel rounded" />
      <input name="title" placeholder="Episode title" className="w-full p-2 mb-2 bg-panel rounded" />
      <input name="abyss" placeholder="Abyss embed URL" className="w-full p-2 mb-2 bg-panel rounded" />
      <input name="filemoon" placeholder="Filemoon embed URL" className="w-full p-2 mb-2 bg-panel rounded" />
      <button className="btn" type="submit">Add Episode</button>
    </form>
  )
}

function ScheduleForm(){
  async function onSubmit(e:any){
    e.preventDefault()
    const fd = new FormData(e.target)
    const doc = {
      anime_id: fd.get('anime_id'), episode_number: fd.get('episode_number'),
      estimated_release: fd.get('estimated_release')
    }
    await fetch('/api/schedules', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'x-admin-key': localStorage.getItem('adminKey')||'' },
      body: JSON.stringify(doc)
    })
    alert('Schedule added')
    e.target.reset()
  }
  return (
    <form className="card p-4 mb-4" onSubmit={onSubmit}>
      <h3 className="font-semibold mb-2">Add Schedule</h3>
      <input name="anime_id" placeholder="anime id" className="w-full p-2 mb-2 bg-panel rounded" required />
      <input name="episode_number" placeholder="episode number" className="w-full p-2 mb-2 bg-panel rounded" required />
      <input name="estimated_release" type="datetime-local" className="w-full p-2 mb-2 bg-panel rounded" />
      <button className="btn" type="submit">Add Schedule</button>
    </form>
  )
}
