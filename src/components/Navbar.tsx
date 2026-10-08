import React, { useState } from 'react';
import { Search, Menu, X, Bookmark, Zap } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  onNavigateHome: () => void;
  onSelectCategory: (category: Category | 'All') => void;
  onOpenSearch: () => void;
  onStartHere: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onSelectCategory,
  onOpenSearch,
  onStartHere,
  onOpenBookmarks,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; action: () => void }[] = [
    { label: 'Home', action: () => { onNavigateHome(); setMobileMenuOpen(false); } },
    { label: 'Training', action: () => { onSelectCategory('Training'); setMobileMenuOpen(false); } },
    { label: 'Race Strategy', action: () => { onSelectCategory('Race Strategy'); setMobileMenuOpen(false); } },
    { label: 'Nutrition', action: () => { onSelectCategory('Nutrition'); setMobileMenuOpen(false); } },
    { label: 'Recovery', action: () => { onSelectCategory('Recovery'); setMobileMenuOpen(false); } },
    { label: 'Gear', action: () => { onSelectCategory('Gear'); setMobileMenuOpen(false); } },
    { label: 'HYROX 101', action: () => { onSelectCategory('HYROX 101'); setMobileMenuOpen(false); } },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={onNavigateHome}
          className="text-left font-display uppercase tracking-wider text-2xl sm:text-3xl font-extrabold text-white hover:text-[#FFE600] transition-colors cursor-pointer"
        >
          THE HYROX JOURNAL
        </button>

        {/* Zone 2: Desktop 4-6 nav links as clean typography */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#FFE600] decoration-2 transition-all cursor-pointer whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            aria-label="Search articles"
            className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <Search className="w-4 h-4 text-[#FFE600]" />
            <span className="hidden sm:inline text-zinc-400">Search</span>
          </button>

          <button
            onClick={onOpenBookmarks}
            aria-label="Saved articles"
            className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer relative"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#FFE600] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onStartHere}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] hover:bg-yellow-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Start Here</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1014] border-b border-white/10 px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-left text-base font-medium text-zinc-200 hover:text-[#FFE600] py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => { onStartHere(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#FFE600] rounded-lg text-center"
              >
                Start Here: HYROX 101
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
