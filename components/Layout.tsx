// components/Layout.tsx
import React from 'react'
import Link from 'next/link'

const Layout: React.FC<{children:any}> = ({children})=>{
  return (
    <>
      <header className="header">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="logo">Zeanime</div>
            <nav className="hidden md:flex gap-3 text-sm text-gray-300">
              <Link href="/home"><a className="hover:text-white">Home</a></Link>
              <Link href="/catalog"><a className="hover:text-white">Catalog</a></Link>
              <Link href="/series"><a className="hover:text-white">Series</a></Link>
              <Link href="/movies"><a className="hover:text-white">Movies</a></Link>
              <Link href="/azlist"><a className="hover:text-white">A–Z</a></Link>
            </nav>
          </div>
          <div>
            <Link href="/admin"><a className="btn">Admin</a></Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="container py-8 text-center text-gray-400">
        © {new Date().getFullYear()} Zeanime — All rights reserved
      </footer>
    </>
  )
}
export default Layout
