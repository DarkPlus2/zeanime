// pages/api/schedules.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try {
    if(req.method==='GET'){
      const r = await query("SELECT s.*, a.title as anime_title FROM schedules s JOIN animes a ON a.id=s.anime_id ORDER BY estimated_release ASC")
      return res.status(200).json(r.rows)
    }
    if(req.method==='POST'){
      if(String(req.headers['x-admin-key']||'') !== process.env.ADMIN_KEY) return res.status(401).json({error:'Unauthorized'})
      const { anime_id, season, episode_number, planned_release, estimated_release, notes } = req.body
      const r = await query(`INSERT INTO schedules (anime_id, season, episode_number, planned_release, estimated_release, notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [anime_id, season||1, episode_number, planned_release||null, estimated_release||null, notes||null])
      return res.status(201).json(r.rows[0])
    }
    res.status(405).end()
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
}
