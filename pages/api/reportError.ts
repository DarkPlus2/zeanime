// pages/api/reportError.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try {
    const payload = req.body
    // minimal: log to console and optionally to a table (not created here)
    console.error("Client error report:", payload)
    res.status(200).json({ok:true})
  } catch (err){
    console.error(err)
    res.status(500).json({error:'Failed'})
  }
}
