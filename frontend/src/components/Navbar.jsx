import React from 'react';

export default function Navbar() {
  return (
    <nav className="relative z-50 border-b border-white/5 backdrop-blur-xl bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/50">
                C
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CineVerse
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-white hover:text-cyan-400 transition-colors">
              Accueil
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Films
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Séries
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Nouveautés
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Ma liste
            </a>
          </div>

          {/* Search & Profile */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 hover:bg-white/5 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hidden md:block p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full cursor-pointer hover:ring-4 ring-purple-500/30 transition-all"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}