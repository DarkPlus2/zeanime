// pages/api/episodes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const { id } = req.query
  try {
    if(req.method==='GET'){
      const r = await query("SELECT * FROM episodes WHERE id=$1", [id])
      if(!r.rowCount) return res.status(404).json({error:'Not found'})
      return res.status(200).json(r.rows[0])
    }
    res.status(405).end()
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
}
