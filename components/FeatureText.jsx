'use client'

export default function FeatureText({ text, href, className = '', colorSelections = [] }) {
  return (
    <a
      href={href}
      className={`relative inline-block font-bold bg-gradient-to-r from-prisma-c via-prisma-f to-prisma-a bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 hover:scale-105 group ${className}`}
    >
      {/* Underline animation */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-prisma-c to-prisma-a group-hover:w-full transition-all duration-300" />
      
      {/* Glow effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-prisma-c to-prisma-a opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
      
      <span className="relative z-10">{text}</span>
    </a>
  )
}
