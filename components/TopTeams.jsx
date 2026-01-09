'use client'

import { FaTrophy, FaExternalLinkAlt, FaVideo, FaCode } from 'react-icons/fa'

const topTeams = [
  {
    name: 'Wenze',
    video: 'https://www.loom.com/share/714ce2e02b584f708f7a2f0e721136c1',
    prototype: 'https://wenze-beta.vercel.app/',
    color: 'from-prisma-a to-prisma-f'
  },
  {
    name: 'MkulimaChain',
    video: 'https://www.youtube.com/watch?v=N1NryrCSE04',
    prototype: 'https://mkulimachain.com/fr',
    color: 'from-prisma-c to-prisma-d'
  },
  {
    name: 'ProofChain',
    video: 'https://youtu.be/WZUOnXIhghY',
    prototype: 'https://proofchain-issuer.vercel.app/login',
    color: 'from-prisma-b to-prisma-e'
  }
]

export default function TopTeams() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaTrophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-prisma-a via-prisma-c to-prisma-f bg-clip-text text-transparent">
              Top 3 Équipes Gagnantes
            </h2>
            <FaTrophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-slate-400 text-lg">
            Les projets sélectionnés lors du Demo Day du 26 décembre 2025
          </p>
        </div>

        {/* Grille des équipes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTeams.map((team, index) => (
            <div
              key={team.name}
              className="group relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 transition-all duration-500 hover:border-prisma-a/50 hover:shadow-2xl hover:shadow-prisma-a/20 hover:-translate-y-2 overflow-hidden"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${team.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

              {/* Contenu */}
              <div className="relative z-10">
                {/* Nom */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-prisma-a group-hover:to-prisma-c transition-all duration-500">
                    {team.name}
                  </h3>
                </div>

                {/* Liens */}
                <div className="space-y-2">
                  <a
                    href={team.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/50 text-slate-300 text-sm font-medium hover:bg-prisma-a/20 hover:border-prisma-a/50 hover:text-white transition-all duration-300"
                  >
                    <FaVideo className="w-4 h-4" />
                    <span>Vidéo de présentation</span>
                    <FaExternalLinkAlt className="w-3 h-3 ml-auto" />
                  </a>

                  <a
                    href={team.prototype}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/50 text-slate-300 text-sm font-medium hover:bg-prisma-c/20 hover:border-prisma-c/50 hover:text-white transition-all duration-300"
                  >
                    <FaCode className="w-4 h-4" />
                    <span>Prototype</span>
                    <FaExternalLinkAlt className="w-3 h-3 ml-auto" />
                  </a>
                </div>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${team.color} opacity-5 rounded-full blur-3xl`} />
              <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r ${team.color} opacity-5 rounded-full blur-2xl`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

