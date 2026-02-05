import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Markets from './components/Markets';
import Protocol from './components/Protocol';
import Trade from './components/Trade';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Escrow from './components/Escrow';
import History from './components/History';
import BackgroundEffects from './components/BackgroundEffects';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Simulate asset loading for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = () => {
    setIsConnected(true);
    setCurrentPage('dashboard');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (isConnected) {
      switch (currentPage) {
        case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
        case 'trade': return <Trade />;
        case 'escrow': return <Escrow />;
        case 'history': return <History />;
        case 'markets': return <Markets />; // Assets view
        default: return <Dashboard onNavigate={setCurrentPage} />;
      }
    } else {
      switch (currentPage) {
        case 'markets': return <Markets />;
        case 'trade': return <Trade />; // Public view of terminal (read-only theoretically)
        case 'protocol': return <Protocol />;
        case 'faq': return <FAQ />;
        case 'home':
        default: return <Hero />;
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-brand-stellar/30 selection:text-white">
      <BackgroundEffects />
      
      <div className={`transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage} 
          isConnected={isConnected}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        {!isConnected && <Sidebar />}
        
        <main className="relative z-10 w-full min-h-screen flex flex-col pt-20">
          {renderPage()}
        </main>
      </div>

      {/* Subtle grain overlay for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default App;