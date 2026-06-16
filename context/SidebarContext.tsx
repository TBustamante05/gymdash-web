'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
    collapsed: boolean
    toggle: () => void
}

const SidebarContext = createContext<SidebarContextType>({
    collapsed: false,
    toggle: () => {}
})

// Provider que envuelve el layout
export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <SidebarContext.Provider value={{
            collapsed,
            toggle: () => setCollapsed(prev => !prev)
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

// Hook para consumir el contexto desde cualquier componente
export function useSidebar() {
    return useContext(SidebarContext)
}