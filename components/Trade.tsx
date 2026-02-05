import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ChevronDown, Activity, Settings, RefreshCw, 
  Layers, BarChart2, Clock, ArrowUpRight, ArrowDownRight, 
  MoreHorizontal, Sliders, History, BookOpen
} from 'lucide-react';

// --- Mock Data Generators ---
const generateCandles = (count: number) => {
  let price = 98.45;
  const candles = [];
  for (let i = 0; i < count; i++) {
    const volatility = 0.05;
    const change = (Math.random() - 0.5) * volatility;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    candles.push({ open, close, high, low, id: i });
    price = close;
  }
  return candles;
};

interface OrderBookRowProps {
  price: string;
  size: string;
  total: string;
  type: 'bid' | 'ask';
}

const OrderBookRow: React.FC<OrderBookRowProps> = ({ price, size, total, type }) => (
  <div className="grid grid-cols-3 text-[10px] py-0.5 hover:bg-white/5 cursor-pointer font-mono">
    <span className={type === 'bid' ? 'text-green-500' : 'text-red-500'}>{price}</span>
    <span className="text-gray-400 text-right">{size}</span>
    <span className="text-gray-500 text-right">{total}</span>
  </div>
);

const Trade: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState('TBILLS');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [timeframe, setTimeframe] = useState('1H');
  const [candles, setCandles] = useState(generateCandles(60));
  const [price, setPrice] = useState('98.45');
  const [amount, setAmount] = useState('');

  // Auto-update price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const last = candles[candles.length - 1];
      const change = (Math.random() - 0.5) * 0.02;
      const newClose = last.close + change;
      const newCandle = {
        ...last,
        close: newClose,
        high: Math.max(last.high, newClose),
        low: Math.min(last.low, newClose)
      };
      setCandles([...candles.slice(0, -1), newCandle]);
      setPrice(newClose.toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, [candles]);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col pt-4 px-2 md:px-6 pb-6 animate-fade-in-up">
      
      {/* --- Terminal Header --- */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4 p-4 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl">
        
        {/* Asset Info */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 text-xl font-oswald font-bold text-white hover:text-brand-stellar transition-colors">
              {selectedAsset} / USDC <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown would go here */}
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div>
            <span className="text-2xl font-mono text-white font-medium">${price}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">24h Change</span>
            <span className="text-xs font-mono text-green-400 flex items-center">
              +1.2% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <div className="flex flex-col hidden md:flex">
             <span className="text-[10px] text-gray-500 uppercase tracking-wider">24h Volume</span>
             <span className="text-xs font-mono text-white">$42,102,932</span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
          {['15m', '1H', '4H', '1D', '1W'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-[10px] font-bold rounded hover:bg-white/10 transition-all ${timeframe === tf ? 'bg-white/10 text-brand-stellar' : 'text-gray-500'}`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>


      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-1 min-h-[600px]">
        
        {/* --- LEFT: Chart Area (Span 3) --- */}
        <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-4">
          
          {/* Chart Container */}
          <div className="flex-1 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl relative overflow-hidden flex flex-col">
            <div className="p-3 border-b border-white/5 flex justify-between items-center">
               <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-400"><BarChart2 className="w-3 h-3" /> Price Action</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Activity className="w-3 h-3" /> Depth</span>
               </div>
               <div className="flex gap-2">
                  <button className="p-1 hover:bg-white/5 rounded"><Settings className="w-3 h-3 text-gray-500" /></button>
               </div>
            </div>
            
            {/* SVG Candlestick Chart Implementation */}
            <div className="flex-1 w-full relative group cursor-crosshair">
               <svg className="w-full h-full p-4" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />
                  
                  {/* Candles */}
                  {candles.map((candle, i) => {
                     const range = 0.5; // Fixed fake range for viz
                     const min = 98.2;
                     const height = 100; // percent
                     
                     // Scale values to percentage coordinates (rough approx for viz)
                     const yHigh = 100 - ((candle.high - min) / range) * 100;
                     const yLow = 100 - ((candle.low - min) / range) * 100;
                     const yOpen = 100 - ((candle.open - min) / range) * 100;
                     const yClose = 100 - ((candle.close - min) / range) * 100;
                     
                     const x = (i / candles.length) * 100;
                     const color = candle.close > candle.open ? '#22c55e' : '#ef4444'; // green-500 : red-500

                     return (
                        <g key={candle.id} className="hover:opacity-80">
                           {/* Wick */}
                           <line x1={`${x}%`} y1={`${yHigh}%`} x2={`${x}%`} y2={`${yLow}%`} stroke={color} strokeWidth="1" />
                           {/* Body */}
                           <rect 
                              x={`calc(${x}% - 3px)`} 
                              y={`${Math.min(yOpen, yClose)}%`} 
                              width="6px" 
                              height={`${Math.abs(yOpen - yClose)}%`} 
                              fill={color} 
                           />
                        </g>
                     )
                  })}
               </svg>
               
               {/* Hover info (Simulated) */}
               <div className="absolute top-4 left-4 font-mono text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  O: <span className="text-white">98.42</span> H: <span className="text-white">98.51</span> L: <span className="text-white">98.39</span> C: <span className="text-white">98.45</span>
               </div>
            </div>
          </div>

          {/* History / Open Orders Table */}
          <div className="h-64 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden flex flex-col">
             <div className="flex items-center gap-6 px-4 py-3 border-b border-white/5">
                <button className="text-xs font-bold text-white border-b-2 border-brand-stellar pb-3 -mb-3.5">Open Orders (2)</button>
                <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors pb-3 -mb-3.5">Order History</button>
                <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors pb-3 -mb-3.5">Trade History</button>
             </div>
             
             <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-white/5 sticky top-0">
                      <tr>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Time</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Pair</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Type</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider">Side</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Price</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Amount</th>
                         <th className="px-4 py-2 text-[10px] text-gray-500 uppercase font-normal tracking-wider text-right">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 text-xs font-mono text-gray-300">
                      <tr className="hover:bg-white/5 transition-colors">
                         <td className="px-4 py-3 text-gray-500">14:02:22</td>
                         <td className="px-4 py-3 font-bold text-white">TBILLS/USDC</td>
                         <td className="px-4 py-3 text-brand-stellar">Limit (ZK)</td>
                         <td className="px-4 py-3 text-green-400">Buy</td>
                         <td className="px-4 py-3 text-right">98.40</td>
                         <td className="px-4 py-3 text-right">50,000</td>
                         <td className="px-4 py-3 text-right flex justify-end gap-2 items-center">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> Open
                         </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                         <td className="px-4 py-3 text-gray-500">10:15:00</td>
                         <td className="px-4 py-3 font-bold text-white">PAXG/USDC</td>
                         <td className="px-4 py-3 text-brand-stellar">Limit (ZK)</td>
                         <td className="px-4 py-3 text-red-400">Sell</td>
                         <td className="px-4 py-3 text-right">2,045.50</td>
                         <td className="px-4 py-3 text-right">10.5</td>
                         <td className="px-4 py-3 text-right flex justify-end gap-2 items-center">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> Open
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>


        {/* --- RIGHT COLUMN (Span 1 or 2): OrderBook + Execution --- */}
        <div className="lg:col-span-1 xl:col-span-2 flex flex-col gap-4">
           
           {/* Order Book / Depth */}
           <div className="flex-1 min-h-[300px] bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Pool Liquidity
                 </span>
                 <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded">0.05% Spread</span>
              </div>
              
              <div className="flex-1 flex flex-col relative">
                 {/* Header Row */}
                 <div className="grid grid-cols-3 px-4 py-2 text-[10px] text-gray-500 uppercase font-mono border-b border-white/5">
                    <span>Price</span>
                    <span className="text-right">Size</span>
                    <span className="text-right">Total</span>
                 </div>
                 
                 {/* Asks (Red) */}
                 <div className="flex-1 overflow-hidden flex flex-col-reverse px-4 pb-2">
                    {Array.from({length: 8}).map((_, i) => (
                       <OrderBookRow key={i} type="ask" price={(98.50 + (i * 0.01)).toFixed(2)} size={(Math.random() * 1000).toFixed(0)} total={(Math.random() * 50000).toFixed(0)} />
                    ))}
                 </div>
                 
                 {/* Spread Indicator */}
                 <div className="py-2 bg-white/5 border-y border-white/10 flex items-center justify-center gap-2">
                    <span className="text-lg font-mono text-white font-bold">98.45</span>
                    <span className="text-xs text-gray-400">≈ $98.45</span>
                 </div>

                 {/* Bids (Green) */}
                 <div className="flex-1 overflow-hidden px-4 pt-2">
                    {Array.from({length: 8}).map((_, i) => (
                       <OrderBookRow key={i} type="bid" price={(98.40 - (i * 0.01)).toFixed(2)} size={(Math.random() * 1000).toFixed(0)} total={(Math.random() * 50000).toFixed(0)} />
                    ))}
                 </div>
              </div>
           </div>

           {/* Execution Form */}
           <div className="bg-black border border-white/10 rounded-xl p-4 shadow-2xl relative overflow-hidden">
              {/* ZK Background effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-stellar/10 blur-3xl rounded-full pointer-events-none"></div>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-lg mb-4">
                 <button 
                    onClick={() => setOrderSide('buy')}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${orderSide === 'buy' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                 >
                    Buy
                 </button>
                 <button 
                    onClick={() => setOrderSide('sell')}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${orderSide === 'sell' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                 >
                    Sell
                 </button>
              </div>

              {/* Order Type */}
              <div className="flex items-center justify-between mb-4">
                 <span className="text-xs text-gray-400">Order Type</span>
                 <button className="text-xs text-brand-stellar font-bold flex items-center gap-1 hover:text-white transition-colors">
                    Limit (ZK) <ChevronDown className="w-3 h-3" />
                 </button>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                 <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <div className="flex justify-between text-[10px] text-gray-500 uppercase mb-1">
                       <span>Price</span>
                       <span>USDC</span>
                    </div>
                    <input 
                       type="text" 
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                       className="w-full bg-transparent text-white font-mono text-sm focus:outline-none" 
                    />
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <div className="flex justify-between text-[10px] text-gray-500 uppercase mb-1">
                       <span>Amount</span>
                       <span>{selectedAsset}</span>
                    </div>
                    <input 
                       type="text" 
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="0.00"
                       className="w-full bg-transparent text-white font-mono text-sm focus:outline-none" 
                    />
                 </div>
                 
                 {/* Slider */}
                 <div className="py-2">
                    <div className="h-1 bg-white/10 rounded-full w-full relative">
                       <div className="absolute left-0 top-0 h-full w-[40%] bg-brand-stellar rounded-full"></div>
                       <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow cursor-pointer hover:scale-125 transition-transform"></div>
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-gray-600 font-mono">
                       <span>0%</span>
                       <span>50%</span>
                       <span>100%</span>
                    </div>
                 </div>

                 {/* Total */}
                 <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-xs text-gray-400">Total</span>
                    <span className="text-sm font-mono text-white">
                       ${amount ? (parseFloat(amount) * parseFloat(price)).toLocaleString() : '0.00'}
                    </span>
                 </div>
              </div>

              {/* Submit Button */}
              <button 
                 className={`w-full mt-6 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${orderSide === 'buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
              >
                 {orderSide} {selectedAsset}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-3 opacity-60">
                 <ShieldCheck className="w-3 h-3 text-brand-stellar" />
                 <span className="text-[10px] text-gray-400">Zero-Knowledge Proof Enabled</span>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
};

export default Trade;