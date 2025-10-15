// pages/api/animes/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try {
    if(req.method==='GET'){
      const q = req.query.q ? `%${String(req.query.q)}%` : null
      if(q){
        const r = await query("SELECT * FROM animes WHERE LOWER(title) LIKE LOWER($1) ORDER BY created_at DESC", [q])
        return res.status(200).json(r.rows)
      }
      const r = await query("SELECT * FROM animes ORDER BY created_at DESC")
      return res.status(200).json(r.rows)
    }
    if(req.method==='POST'){
      if(String(req.headers['x-admin-key']||'') !== process.env.ADMIN_KEY) return res.status(401).json({error:'Unauthorized'})
      const { title, slug, poster, description, genres, type, hindi_dub } = req.body
      const r = await query(`INSERT INTO animes (title,slug,poster,description,genres,type,hindi_dub) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [title,slug,poster,description,genres,type,hindi_dub])
      return res.status(201).json(r.rows[0])
    }
    res.status(405).end()
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
}
