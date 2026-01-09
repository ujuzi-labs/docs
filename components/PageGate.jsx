'use client'

import { useState } from 'react'
import { FaLock, FaUnlock, FaEye, FaEyeSlash } from 'react-icons/fa6'

export default function PageGate({ children, requiredPassword }) {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (password === requiredPassword) {
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
      // Shake animation trigger
      const form = e.target
      form.classList.add('shake')
      setTimeout(() => form.classList.remove('shake'), 500)
    }
    
    setIsLoading(false)
  }

  if (isUnlocked) {
    return (
      <div className="animate-fadeIn">
        {children}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[500px] p-8 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-0 left-0 w-96 h-96 bg-prisma-a/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-prisma-c/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 shadow-2xl">
          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-prisma-a/20 to-prisma-c/20 flex items-center justify-center border-2 border-prisma-a/30">
                <FaLock className="w-10 h-10 text-prisma-a" />
              </div>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-prisma-a/30 animate-ping" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent">
            Contenu protégé
          </h2>
          
          {/* Description */}
          <p className="text-center text-slate-400 mb-8">
            Veuillez entrer le mot de passe pour accéder à ce contenu.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-4 py-3 pl-12 pr-12 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-prisma-a/50 focus:border-prisma-a/50 transition-all duration-300 backdrop-blur-sm"
                  autoFocus
                  disabled={isLoading}
                />
                
                {/* Lock icon inside input */}
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                
                {/* Show/Hide password button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-slideDown">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  {error}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full px-6 py-3 bg-gradient-to-r from-prisma-a via-prisma-c to-prisma-f text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-prisma-a/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              {/* Animated gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-prisma-f via-prisma-a to-prisma-c opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    <FaUnlock className="w-4 h-4" />
                    Accéder
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-prisma-a/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-prisma-c/10 rounded-full blur-2xl" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}
