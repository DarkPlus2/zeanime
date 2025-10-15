// pages/api/animes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const { id } = req.query
  try {
    if(req.method==='GET'){
      const r = await query("SELECT * FROM animes WHERE id=$1", [id])
      if(!r.rowCount) return res.status(404).json({error:'Not found'})
      // load episodes as well
      const anime = r.rows[0]
      const eps = await query("SELECT * FROM episodes WHERE anime_id=$1 ORDER BY season, episode_number", [id])
      anime.episodes = eps.rows
      return res.status(200).json(anime)
    }
    if(req.method==='PUT'){
      if(String(req.headers['x-admin-key']||'') !== process.env.ADMIN_KEY) return res.status(401).json({error:'Unauthorized'})
      const { title, poster, description, genres, type, hindi_dub } = req.body
      const r = await query(`UPDATE animes SET title=$1, poster=$2, description=$3, genres=$4, type=$5, hindi_dub=$6, updated_at=NOW() WHERE id=$7 RETURNING *`, [title,poster,description,genres,type,hindi_dub,id])
      return res.status(200).json(r.rows[0])
    }
    if(req.method==='DELETE'){
      if(String(req.headers['x-admin-key']||'') !== process.env.ADMIN_KEY) return res.status(401).json({error:'Unauthorized'})
      await query("DELETE FROM animes WHERE id=$1", [id])
      return res.status(204).end()
    }
    res.status(405).end()
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
}
