import { createFileRoute, Link } from '@tanstack/react-router'
import Calculator from '../components/Calculator'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <nav className="flex gap-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg border-2 border-gray-300 font-medium hover:bg-gray-50 transition-colors [&.active]:border-blue-500 [&.active]:text-blue-600"
        >
          Calculator
        </Link>
        <Link
          to="/tic-tac-toe"
          className="px-4 py-2 rounded-lg border-2 border-gray-300 font-medium hover:bg-gray-50 transition-colors [&.active]:border-blue-500 [&.active]:text-blue-600"
        >
          Tic Tac Toe
        </Link>
      </nav>
      <Calculator />
    </div>
  )
}
