import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'ZeeAnime',
  description: 'Stream anime — ZeeAnime'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-8">{children}</main>
        <footer className="text-center py-8 text-sm text-neutral-500">© {new Date().getFullYear()} ZeeAnime</footer>
      </body>
    </html>
  )
}
