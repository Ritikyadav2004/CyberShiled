import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Shield, Home, Activity, Hexagon, Fingerprint } from "lucide-react"

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-16 bg-[#0c0d12]/50 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Aegis AI Mobile Sentinel
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-2 lg:gap-6">
        <NavLink href="/" active={isActive('/')} icon={<Home className="w-4 h-4" />}>Dashboard</NavLink>
        <NavLink href="/dashboard" active={isActive('/dashboard')} icon={<Activity className="w-4 h-4" />}>Threats</NavLink>
        <NavLink href="/analysis/demo-1" active={isActive('/analysis/demo-1')} icon={<Fingerprint className="w-4 h-4" />}>Scanner</NavLink>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          THREAT ENGINE ACTIVE
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hidden sm:block"></div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children, icon }: { href: string, active: boolean, children: React.ReactNode, icon: React.ReactNode }) {
  return (
    <Link 
      to={href} 
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all font-medium text-xs tracking-wider uppercase
        ${active 
          ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_-2px_0_theme(colors.cyan.500)] border border-cyan-500/20' 
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
    >
      {icon}
      {children}
    </Link>
  )
}
