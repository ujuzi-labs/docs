'use client'

import { createContext, useContext, ReactNode } from 'react'

interface ActiveJourneyContextType {
  // Add any journey-related state here if needed
}

const ActiveJourneyContext = createContext<ActiveJourneyContextType | undefined>(undefined)

export function ActiveJourneyProvider({ children }: { children: ReactNode }) {
  return (
    <ActiveJourneyContext.Provider value={{}}>
      {children}
    </ActiveJourneyContext.Provider>
  )
}

export function useActiveJourney() {
  const context = useContext(ActiveJourneyContext)
  if (context === undefined) {
    throw new Error('useActiveJourney must be used within an ActiveJourneyProvider')
  }
  return context
}

