'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  FaPhone, 
  FaLinkedinIn, 
  FaGithub, 
  FaGlobe, 
  FaXTwitter 
} from 'react-icons/fa6'

const iconMap = {
  FaPhone,
  FaLinkedinIn,
  FaGithub,
  FaGlobe,
  FaXTwitter
}

export default function TeamCards() {
  const [team, setTeam] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    fetch('/team.json')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error('Error loading team:', err))
  }, [])

  if (team.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Chargement de l'équipe...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
      {team.map((member, index) => {
        const IconComponent = iconMap[member.icon]
        return (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card with glassmorphism effect */}
            <div className="relative h-full bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-500 hover:border-prisma-a/50 hover:shadow-2xl hover:shadow-prisma-a/20 hover:-translate-y-2 overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-prisma-a/10 via-prisma-c/10 to-prisma-f/10" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-prisma-a via-prisma-c to-prisma-f rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-slate-700/50 group-hover:ring-prisma-a/50 transition-all duration-500 group-hover:scale-110">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Pulse animation on hover */}
                  <div className="absolute inset-0 rounded-full bg-prisma-a/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-center mb-1 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-prisma-a group-hover:to-prisma-c transition-all duration-500">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-center text-slate-400 mb-4 group-hover:text-prisma-c transition-colors duration-500">
                  {member.role}
                </p>

                {/* Links */}
                {member.links && member.links.length > 0 && (
                  <div className="flex justify-center gap-3 flex-wrap">
                    {member.links.map((link, linkIndex) => {
                      const LinkIcon = iconMap[link.icon] || FaGlobe
                      return (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-prisma-a/20 hover:border-prisma-a/50 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-prisma-a/30"
                          title={link.label}
                        >
                          <LinkIcon className="w-4 h-4" />
                        </a>
                      )
                    })}
                  </div>
                )}

                {/* Profile link button */}
                {member.profile_card_link && (
                  <a
                    href={member.profile_card_link}
                    className="mt-4 block w-full text-center px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/50 text-slate-300 text-sm font-medium hover:bg-prisma-a/20 hover:border-prisma-a/50 hover:text-white transition-all duration-300"
                  >
                    Voir le profil
                  </a>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-prisma-a/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-prisma-c/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
