import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}
        <Footer />
       
        <Toaster />
      </body>
    </html>
  )
}