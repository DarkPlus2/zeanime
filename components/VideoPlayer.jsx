'use client'

import React from 'react'
import { Plyr } from 'plyr-react'
import 'plyr/dist/plyr.css'

export default function VideoPlayer({ src, poster }){
  const source = {
    type: 'video',
    sources: [ { src, provider: 'html5' } ]
  }

  return (
    <div className="card p-4">
      <Plyr source={source} options={{ autoplay: false }} />
    </div>
  )
}
