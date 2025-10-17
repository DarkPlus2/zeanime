import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

// attach token from cookie/localStorage if present (simple)
API.interceptors.request.use((cfg)=>{
  try{
    const token = typeof window !== 'undefined' ? localStorage.getItem('za_token') : null
    if (token) cfg.headers.Authorization = `Bearer ${token}`
  }catch{}
  return cfg
})

export default API
