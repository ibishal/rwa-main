import React from 'react';
import { TrendingUp, Activity, Globe, Shield } from 'lucide-react';
import AssetCard from './AssetCard';

const Markets: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative px-6 md:px-12 py-20 flex flex-col">
      
      {/* Background Fluid Texture */}
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
           <h2 className="text-gray-500 text-xs tracking-[0.4em] uppercase mb-4">Registry</h2>
           <h1 className="text-4xl md:text-6xl font-condensed font-bold text-white uppercase tracking-tight">
             Supported <span className="text-brand-stellar italic">Assets</span>
           </h1>
        </div>

        {/* Highlighted Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
           
           <div className="group h-[300px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="bonds" isMain />
              </div>
           </div>

           <div className="group h-[300px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="gold" isMain />
              </div>
           </div>

           <div className="group h-[300px] perspective-1000">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
                 <AssetCard type="realestate" isMain />
              </div>
           </div>

        </div>

        {/* Detailed Registry Table */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5">
           <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-brand-stellar" />
              <h3 className="text-lg font-condensed font-bold uppercase tracking-wide">Official Asset Registry</h3>
           </div>
           
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-white/10">
                    <th className="pb-4 pl-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Asset</th>
                    <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Type</th>
                    <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Issuer Domain</th>
                    <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Supply</th>
                    <th className="pb-4 pr-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Contract Address</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 <tr className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-4 font-bold text-white flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] border border-blue-500/30">T</span>
                       TBILL
                    </td>
                    <td className="py-4 text-xs text-gray-400">Security / Treasury</td>
                    <td className="py-4 text-xs text-brand-stellar font-mono">treasury.gov.io</td>
                    <td className="py-4 text-right text-xs font-mono text-white">$500,000,000</td>
                    <td className="py-4 pr-4 text-right text-xs font-mono text-gray-500">0x7a...9c21</td>
                 </tr>
                 <tr className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-4 font-bold text-white flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px] border border-yellow-500/30">P</span>
                       PAXG
                    </td>
                    <td className="py-4 text-xs text-gray-400">Commodity / Gold</td>
                    <td className="py-4 text-xs text-brand-stellar font-mono">paxos.com</td>
                    <td className="py-4 text-right text-xs font-mono text-white">$84,000,000</td>
                    <td className="py-4 pr-4 text-right text-xs font-mono text-gray-500">0x2b...1d4f</td>
                 </tr>
                 <tr className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-4 font-bold text-white flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px] border border-green-500/30">U</span>
                       USDC
                    </td>
                    <td className="py-4 text-xs text-gray-400">Currency / Stablecoin</td>
                    <td className="py-4 text-xs text-brand-stellar font-mono">circle.com</td>
                    <td className="py-4 text-right text-xs font-mono text-white">$24,000,000,000</td>
                    <td className="py-4 pr-4 text-right text-xs font-mono text-gray-500">0x1a...5e99</td>
                 </tr>
              </tbody>
           </table>
        </div>

      </div>
    </div>
  );
};

export default Markets;