import { useState } from 'react';
import { GithubLogo, LinkedinLogo, List, X } from '@phosphor-icons/react';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-[100]">
      <nav
        aria-label="Primary navigation"
        className="bg-black/95 backdrop-blur-sm brutalist-border brutalist-shadow px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4"
      >
        <a href="#landing" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-[#141414] border border-white flex items-center justify-center relative shrink-0 group-hover:bg-white transition-colors">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/25 group-hover:bg-black/20"
            />
            <span className="font-mono-retro text-xl tracking-wider text-white group-hover:text-black leading-none relative z-10">
              EA
            </span>
          </div>
          <span className="font-medium text-xl tracking-tight hidden sm:block text-white whitespace-nowrap">
            Eldrei Tyler Acero
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 font-mono-retro text-base tracking-[0.2em] uppercase">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-zinc-300 hover:bg-white hover:text-black transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="hidden md:flex gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="w-10 h-10 border border-white/40 bg-[#0a0a0a] flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-colors"
            >
              <GithubLogo weight="bold" size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="w-10 h-10 border border-white/40 bg-[#0a0a0a] flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-colors"
            >
              <LinkedinLogo weight="bold" size={18} />
            </a>
          </div>
          <button
            type="button"
            onClick={onOpenResume}
            className="bg-white text-black border-2 border-white px-4 sm:px-5 py-1.5 font-mono-retro text-lg uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 border-2 border-white bg-black flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X weight="bold" size={20} /> : <List weight="bold" size={20} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-black/95 backdrop-blur-sm brutalist-border brutalist-shadow p-4 flex flex-col font-mono-retro text-xl tracking-[0.2em] uppercase divide-y divide-white/10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:bg-white hover:text-black transition-colors px-3 py-2.5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
