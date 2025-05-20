
import AuthGuard from './components/AuthGuard'
import Home from './components/Homepage'

export default function HomePage() {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  )
}
