import { useState } from 'react'

type Square = 'X' | 'O' | null

function calculateWinner(squares: Square[]): { winner: Square; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const result = calculateWinner(squares)
  const winner = result?.winner
  const winLine = result?.line ?? []
  const isDraw = !winner && squares.every(Boolean)

  function handleClick(index: number) {
    if (squares[index] || winner) return
    const next = squares.slice()
    next[index] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  function reset() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const status = winner
    ? `Player ${winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${xIsNext ? 'X' : 'O'}'s turn`

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Tic Tac Toe</h1>

      <div
        className={`text-lg font-medium px-4 py-2 rounded-lg border ${
          winner ? 'border-green-500 text-green-600' : isDraw ? 'border-yellow-500 text-yellow-600' : 'border-transparent'
        }`}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => {
          const isWinSquare = winLine.includes(i)
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`w-24 h-24 text-4xl font-bold rounded-xl border-2 transition-colors
                ${isWinSquare ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:bg-gray-50'}
                ${square === 'X' && !isWinSquare ? 'text-blue-600' : ''}
                ${square === 'O' && !isWinSquare ? 'text-red-500' : ''}
                ${!square && !winner ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              {square}
            </button>
          )
        })}
      </div>

      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg border-2 border-gray-300 font-medium hover:bg-gray-50 transition-colors"
      >
        New Game
      </button>
    </div>
  )
}
