// components/AnimeCard.tsx
import React from 'react'
import Link from 'next/link'

export default function AnimeCard({anime}:{anime:any}){
  return (
    <Link href={`/watch/${anime.id}`}>
      <a className="card">
        <img src={anime.poster||'/assets/placeholder.jpg'} alt={anime.title} style={{width:'100%', height:220, objectFit:'cover'}}/>
        <div style={{padding:'0.75rem'}}>
          <h3 style={{fontWeight:700}}>{anime.title}</h3>
          <div style={{color:'#9aa0a6', fontSize:13}}>{(anime.genres||[]).join(', ')}</div>
        </div>
      </a>
    </Link>
  )
}
