// pages/azlist.tsx
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())

export default function AZList(){
  const {data} = useSWR('/api/animes', fetcher)
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">A–Z</h1>
      <div className="grid grid-cols-6 gap-3 mb-6">
        {letters.map(l=> <a key={l} href={`#${l}`} className="py-2 px-3 card text-center">{l}</a>)}
      </div>
      <div>
        {letters.map(letter=>{
          const list = (data||[]).filter((a:any)=> (a.title||'').startsWith(letter))
          return (
            <div id={letter} key={letter} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{letter}</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {list.map((a:any)=>(<div className="card p-2" key={a.id}><a href={`/watch/${a.id}`}>{a.title}</a></div>))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
