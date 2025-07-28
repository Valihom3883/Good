import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
