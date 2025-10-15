// pages/api/episodes/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try {
    if(req.method==='POST'){
      if(String(req.headers['x-admin-key']||'') !== process.env.ADMIN_KEY) return res.status(401).json({error:'Unauthorized'})
      const { anime_id, season, episode_number, title, servers, skip_ranges, released_at } = req.body
      const r = await query(`INSERT INTO episodes (anime_id, season, episode_number, title, servers, skip_ranges, released_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [anime_id, season, episode_number, title, servers ? JSON.stringify(servers) : null, skip_ranges ? JSON.stringify(skip_ranges) : null, released_at || null])
      return res.status(201).json(r.rows[0])
    }
    res.status(405).end()
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
}
