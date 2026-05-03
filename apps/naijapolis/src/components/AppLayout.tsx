import { Link, useRouterState } from '@tanstack/react-router'
import {
  Activity,
  Users,
  DollarSign,
  Calendar,
  Target,
  Map,
  Megaphone,
  Settings,
  Flag,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/', label: 'Activity Feed', icon: Activity, exact: true },
  { to: '/people', label: 'People', icon: Users },
  { to: '/finance', label: 'Finance', icon: DollarSign },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/canvassing', label: 'Canvassing', icon: Map },
  { to: '/advocacy', label: 'Advocacy', icon: Megaphone },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function NavLink({ item, onClick }: { item: (typeof navItems)[0]; onClick?: () => void }) {
  const { location } = useRouterState()
  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to)

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-green-700 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      )}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {item.label}
    </Link>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-gray-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-60 h-full bg-gray-900 z-50">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 text-white flex-shrink-0">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-green-400">PoliForge OS</span>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-700">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <Flag className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm">PoliForge OS</div>
          <div className="text-xs text-gray-400">Campaign Platform</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink key={item.to} item={item} onClick={onNavClick} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700">
        <div className="text-xs text-gray-500">🇳🇬 Built for Nigeria</div>
      </div>
    </>
  )
}
