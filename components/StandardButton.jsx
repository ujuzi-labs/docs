'use client'

export default function StandardButton({ children, className = '', ...props }) {
  return (
    <button
      className={`relative px-6 py-3 bg-gradient-to-r from-prisma-f via-prisma-a to-prisma-c text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-prisma-a/50 hover:scale-105 active:scale-95 overflow-hidden group ${className}`}
      {...props}
    >
      {/* Animated gradient overlay on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-prisma-c via-prisma-f to-prisma-a opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-prisma-a to-prisma-c opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  )
}
