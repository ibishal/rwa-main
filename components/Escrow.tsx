import React, { useState } from 'react';
import { Download, Upload, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { Asset } from '../types';

const Escrow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedAsset, setSelectedAsset] = useState('USDC');
  const [amount, setAmount] = useState('');

  // Mock Assets
  const assets: Asset[] = [
    { symbol: 'USDC', name: 'USD Coin', balance: 50240.50, locked: 12000.00, price: 1.00, type: 'currency', address: '0x...' },
    { symbol: 'TBILL', name: 'US Treasury Bill', balance: 150.00, locked: 0, price: 98.45, type: 'security', address: '0x...' },
    { symbol: 'PAXG', name: 'PAX Gold', balance: 2.50, locked: 1.00, price: 2042.10, type: 'commodity', address: '0x...' },
  ];

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-8 flex justify-center animate-fade-in-up">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
         
         {/* Left: Balances Overview */}
         <div>
            <h2 className="text-3xl font-condensed font-bold text-white uppercase mb-2">Fund Management</h2>
            <p className="text-gray-400 text-sm mb-8">
               Deposit assets into the Dark Pool smart contract. Funds in escrow are used for ZK-proof order commitments.
            </p>

            <div className="space-y-4">
               {assets.map((asset) => (
                  <div key={asset.symbol} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors cursor-pointer" onClick={() => setSelectedAsset(asset.symbol)}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 font-bold text-sm">
                           {asset.symbol[0]}
                        </div>
                        <div>
                           <h4 className="text-white font-bold">{asset.name}</h4>
                           <p className="text-xs text-gray-500 font-mono">Available: {asset.balance.toLocaleString()} {asset.symbol}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm text-white font-mono">${((asset.balance + asset.locked) * asset.price).toLocaleString()}</p>
                        {asset.symbol === selectedAsset && (
                           <span className="text-[10px] text-brand-stellar uppercase font-bold tracking-wider">Selected</span>
                        )}
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3">
               <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
               <p className="text-xs text-blue-200 leading-relaxed">
                  <strong>Security Note:</strong> Withdrawals require a ZK-proof of non-inclusion in pending orders. This ensures no double-spending of committed assets.
               </p>
            </div>
         </div>

         {/* Right: Action Form */}
         <div>
            <div className="glass-panel rounded-2xl p-8 border border-white/10 relative overflow-hidden">
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-stellar/5 blur-[80px] rounded-full pointer-events-none"></div>

               {/* Tabs */}
               <div className="flex p-1 bg-black/40 rounded-xl mb-8">
                  <button 
                     onClick={() => setActiveTab('deposit')}
                     className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'deposit' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                     <Download className="w-4 h-4" /> Deposit
                  </button>
                  <button 
                     onClick={() => setActiveTab('withdraw')}
                     className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'withdraw' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                     <Upload className="w-4 h-4" /> Withdraw
                  </button>
               </div>

               {/* Form */}
               <div className="space-y-6">
                  
                  {/* Asset Select */}
                  <div className="space-y-2">
                     <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Asset</label>
                     <select 
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-stellar/50 transition-colors appearance-none cursor-pointer"
                     >
                        {assets.map(a => <option key={a.symbol} value={a.symbol} className="bg-black">{a.name} ({a.symbol})</option>)}
                     </select>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Amount</label>
                        <span className="text-xs text-brand-stellar cursor-pointer hover:text-white transition-colors">Max: 54,200.00</span>
                     </div>
                     <div className="relative">
                        <input 
                           type="number" 
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           placeholder="0.00"
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-lg focus:outline-none focus:border-brand-stellar/50 transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{selectedAsset}</span>
                     </div>
                  </div>

                  {/* Network Fee Mock */}
                  <div className="flex justify-between items-center py-4 border-t border-white/10 text-xs">
                     <span className="text-gray-500">Network Fee</span>
                     <span className="text-white font-mono">0.00001 XLM</span>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full py-4 bg-brand-stellar hover:bg-brand-stellar/80 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(125,0,255,0.3)] hover:shadow-[0_0_30px_rgba(125,0,255,0.5)] flex items-center justify-center gap-2 group">
                     {activeTab === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdraw'}
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Footer Security Note */}
                  <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                     <Shield className="w-3 h-3" />
                     <span className="text-[10px] uppercase tracking-wider">Secured by Protocol 25</span>
                  </div>

               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Escrow;