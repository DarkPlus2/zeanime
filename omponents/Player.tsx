// components/Player.tsx
import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'

type Server = { id:string; name:string; type:string; url:string; quality?:string; subtitles?:{lang:string, url:string}[] }

export default function Player({ server }:{server: Server | null}){
  const videoRef = useRef<HTMLVideoElement|null>(null)

  useEffect(()=>{
    if(!server) return
    const v = videoRef.current
    if(!v) return

    if(server.type === 'embed'){
      // nothing here; embed handled outside by iframe
    } else if(server.type === 'hls'){
      if(v.canPlayType('application/vnd.apple.mpegurl')){
        v.src = server.url
      } else if(Hls.isSupported()){
        const hls = new Hls()
        hls.loadSource(server.url)
        hls.attachMedia(v)
        return ()=> hls.destroy()
      }
    }
  }, [server])

  if(!server) return <div className="card p-4">No server selected</div>
  if(server.type === 'embed'){
    return <iframe src={server.url} frameBorder={0} allowFullScreen style={{width:'100%', height:560}} />
  }
  return <video ref={videoRef} controls style={{width:'100%', height:560}} />
}
