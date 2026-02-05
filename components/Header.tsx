import React from 'react';
import { ArrowRight, Wallet, Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage = 'home' }) => {
  
  const navItems = [
    { label: 'MARKETS', id: 'markets' },
    { label: 'TRADE', id: 'trade' },
    { label: 'PROTOCOL', id: 'protocol' },
    { label: 'FAQ', id: 'faq' }
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
      {/* Logo Area */}
      <div className="flex items-center">
        <div 
          className="relative group cursor-pointer" 
          onClick={(e) => handleNavClick('home', e)}
        >
          <h1 className="text-2xl md:text-3xl font-condensed tracking-wide italic font-bold text-white uppercase">
            Duskpool
          </h1>
          {/* Logo decorative element */}
          <svg className="absolute -top-3 -left-2 w-32 h-12 pointer-events-none opacity-90" viewBox="0 0 100 40">
            <path 
              d="M10,25 Q40,15 90,25" 
              fill="none" 
              stroke="#7d00ff" 
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-60"
            />
            <circle cx="90" cy="25" r="1.5" fill="#7d00ff" />
          </svg>
        </div>
      </div>

      {/* Navigation Pill */}
      <div className="hidden lg:flex items-center">
        {/* Main Nav Links */}
        <nav className="flex items-center bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full px-1 py-1 mr-4">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`
                      relative px-6 py-2.5 text-[11px] font-medium tracking-widest transition-all duration-300 rounded-full
                      ${isActive 
                        ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(125,0,255,0.2)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <span className={`${isActive ? 'flex items-center gap-2' : ''}`}>
                      {isActive && <span className="w-1 h-1 bg-brand-stellar rounded-full animate-pulse shadow-[0_0_5px_#7d00ff]"></span>}
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Connect Wallet Button */}
          <button className="group flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-brand-stellar/50 rounded-full pl-6 pr-2 py-2 transition-all duration-300">
            <span className="text-[11px] font-bold tracking-widest text-white">CONNECT WALLET</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-stellar/20 transition-colors">
              <ArrowRight className="w-3 h-3 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </button>

          {/* Wallet Icon */}
          <button className="w-12 h-12 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 group">
            <Wallet className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
          </button>

          {/* Menu Icon */}
          <button className="w-12 h-12 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 group">
            <div className="flex flex-col gap-[5px] items-end">
              <span className="w-5 h-[1.5px] bg-gray-300 group-hover:bg-white transition-colors"></span>
              <span className="w-3 h-[1.5px] bg-gray-300 group-hover:bg-white transition-colors group-hover:w-5 duration-300"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="lg:hidden w-10 h-10 flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full">
        <Menu className="w-5 h-5 text-white" />
      </button>
    </header>
  );
};

export default Header;