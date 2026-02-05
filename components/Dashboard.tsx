import React from 'react';
import { ShieldCheck, Wallet, Activity, ArrowUpRight, Lock, UserCheck } from 'lucide-react';
import { Asset } from '../types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  
  // Mock Data
  const assets: Asset[] = [
    { symbol: 'USDC', name: 'USD Coin', balance: 50240.50, locked: 12000.00, price: 1.00, type: 'currency', address: '0x...' },
    { symbol: 'TBILL', name: 'US Treasury Bill', balance: 150.00, locked: 0, price: 98.45, type: 'security', address: '0x...' },
    { symbol: 'PAXG', name: 'PAX Gold', balance: 2.50, locked: 1.00, price: 2042.10, type: 'commodity', address: '0x...' },
  ];

  const totalEquity = assets.reduce((acc, asset) => acc + (asset.balance + asset.locked) * asset.price, 0);
  const totalLocked = assets.reduce((acc, asset) => acc + asset.locked * asset.price, 0);

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-8 animate-fade-in-up">
      
      {/* --- Top Stats Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Value Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-16 h-16 text-brand-stellar" />
           </div>
           <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Equity</p>
           <h3 className="text-3xl font-oswald text-white">${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
           <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                 +2.4% <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="text-[10px] text-gray-500">vs last 24h</span>
           </div>
        </div>

        {/* Locked Value Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lock className="w-16 h-16 text-gray-400" />
           </div>
           <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Locked in Orders</p>
           <h3 className="text-3xl font-oswald text-gray-300">${totalLocked.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
           <p className="mt-4 text-[10px] text-gray-500">Available: ${(totalEquity - totalLocked).toLocaleString()}</p>
        </div>

        {/* Active Orders Count */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-brand-stellar/50 transition-colors" onClick={() => onNavigate('history')}>
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-16 h-16 text-white" />
           </div>
           <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Active Orders</p>
           <h3 className="text-3xl font-oswald text-white">4</h3>
           <div className="mt-4 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-400">Matching Engine Active</span>
           </div>
        </div>

        {/* Whitelist Status */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group bg-brand-stellar/5 border-brand-stellar/20">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <UserCheck className="w-16 h-16 text-brand-stellar" />
           </div>
           <p className="text-xs text-brand-stellar uppercase tracking-widest mb-2">KYC Status</p>
           <h3 className="text-xl font-oswald text-white mb-1">VERIFIED TIER 2</h3>
           <p className="text-[10px] text-brand-stellar/70 mb-4">Institutional Access Granted</p>
           <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-black/20 p-2 rounded">
              <ShieldCheck className="w-3 h-3 text-brand-stellar" />
              Merkle Root: 0x9f...2a1b
           </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Escrow Balances (Takes up 2 cols) */}
         <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-condensed font-bold uppercase tracking-wide">Escrow Balances</h3>
               <button 
                 onClick={() => onNavigate('escrow')}
                 className="text-xs text-brand-stellar hover:text-white transition-colors uppercase tracking-widest font-bold"
               >
                  Manage Funds
               </button>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/10">
                        <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Asset</th>
                        <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Balance</th>
                        <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Locked</th>
                        <th className="pb-4 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Value (USD)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {assets.map((asset) => (
                        <tr key={asset.symbol} className="group hover:bg-white/5 transition-colors">
                           <td className="py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono">
                                    {asset.symbol[0]}
                                 </div>
                                 <div>
                                    <div className="text-sm font-bold text-white">{asset.name}</div>
                                    <div className="text-[10px] text-gray-500">{asset.type.toUpperCase()}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="py-4 text-right font-mono text-sm text-gray-300">
                              {asset.balance.toLocaleString()} <span className="text-[10px] text-gray-600">{asset.symbol}</span>
                           </td>
                           <td className="py-4 text-right font-mono text-sm text-gray-500">
                              {asset.locked > 0 ? (
                                <span className="flex items-center justify-end gap-1">
                                   <Lock className="w-3 h-3" /> {asset.locked.toLocaleString()}
                                </span>
                              ) : '-'}
                           </td>
                           <td className="py-4 text-right font-mono text-sm text-white">
                              ${((asset.balance + asset.locked) * asset.price).toLocaleString()}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Recent Activity / Settlements */}
         <div className="lg:col-span-1 glass-panel rounded-2xl p-6 border border-white/5 flex flex-col">
            <h3 className="text-lg font-condensed font-bold uppercase tracking-wide mb-6">Recent Settlements</h3>
            
            <div className="flex-1 space-y-4">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                     <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                           <div className="text-xs font-bold text-white uppercase">{i % 2 === 0 ? 'Buy' : 'Sell'} TBILL</div>
                           <div className="text-[10px] text-gray-500 font-mono">10:42 AM</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs font-mono text-white">500.00</div>
                        <div className="text-[10px] text-gray-500">@ 98.42</div>
                     </div>
                  </div>
               ))}
            </div>

            <button 
               onClick={() => onNavigate('history')}
               className="w-full mt-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-gray-400 hover:text-white transition-all uppercase tracking-widest"
            >
               View All History
            </button>
         </div>

      </div>
    </div>
  );
};

export default Dashboard;