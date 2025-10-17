export const setToken = (token) => {
  if (typeof window !== 'undefined') localStorage.setItem('za_token', token)
}
export const getToken = ()=> typeof window !== 'undefined' ? localStorage.getItem('za_token') : null
export const clearToken = ()=> typeof window !== 'undefined' ? localStorage.removeItem('za_token') : null
