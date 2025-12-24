'use client'

import { useState } from 'react'

export default function PageGate({ children, requiredPassword }) {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === requiredPassword) {
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">Contenu protégé</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Veuillez entrer le mot de passe pour accéder à ce contenu.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  )
}

