import React from 'react';
import { TrendingUp, Activity, Globe } from 'lucide-react';
import AssetCard from './AssetCard';

const Markets: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative px-6 md:px-12 py-20 flex flex-col">
      
      {/* Background Fluid Texture (Simulating the green cloth from reference but dark) */}
      <div className="absolute inset-0 bg-black overflow-hidden z-0">
         <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-stellar/10 via-black to-black opacity-40 blur-[100px]"></div>
         <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
             <filter id="noise">
                 <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
             </filter>
             <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
           <h2 className="text-gray-500 text-xs tracking-[0.4em] uppercase mb-4">Available Pools</h2>
           <h1 className="text-4xl md:text-6xl font-condensed font-bold text-white uppercase tracking-tight">
             Institutional Grade <span className="text-brand-stellar italic">Assets</span>
           </h1>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           {/* Asset 1 */}
           <div className="group h-[400px] md:h-[500px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="bonds" isMain />
                 
                 {/* Hover Overlay Details (Inspired by the variant selector) */}
                 <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">Yield</span>
                          <span className="text-green-400 font-mono">5.2% APY</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">Liquidity</span>
                          <span className="text-white font-mono">$420M</span>
                       </div>
                       <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-white transition-colors">
                          Trade
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Asset 2 */}
           <div className="group h-[400px] md:h-[500px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="gold" isMain />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">Asset</span>
                          <span className="text-yellow-400 font-mono">PAXG</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">24h Vol</span>
                          <span className="text-white font-mono">$12M</span>
                       </div>
                       <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-white transition-colors">
                          Trade
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Asset 3 */}
           <div className="group h-[400px] md:h-[500px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="realestate" isMain />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">Type</span>
                          <span className="text-purple-400 font-mono">Commercial REIT</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-wider">Min Entry</span>
                          <span className="text-white font-mono">$50k</span>
                       </div>
                       <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-white transition-colors">
                          Trade
                       </button>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Global Stats Footer */}
        <div className="mt-20 border-t border-white/10 pt-10 flex flex-wrap justify-between gap-8">
           <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-gray-600" />
              <div>
                 <p className="text-xs text-gray-500 uppercase">Global TVL</p>
                 <p className="text-xl text-white font-oswald">$1.2 Billion</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-gray-600" />
              <div>
                 <p className="text-xs text-gray-500 uppercase">24h Trades</p>
                 <p className="text-xl text-white font-oswald">8,402</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-gray-600" />
              <div>
                 <p className="text-xs text-gray-500 uppercase">Active Pools</p>
                 <p className="text-xl text-white font-oswald">14</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Markets;