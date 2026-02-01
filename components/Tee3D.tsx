import React from 'react';

interface Tee3DProps {
  color: 'silver' | 'rosegold' | 'gold';
  isMain?: boolean;
}

const Tee3D: React.FC<Tee3DProps> = ({ color, isMain = false }) => {
  // Define gradient colors based on prop
  const getGradient = () => {
    switch (color) {
      case 'rosegold':
        return {
          base: 'bg-gradient-to-b from-[#E6C6C6] via-[#B76E79] to-[#5C3036]',
          shine: 'from-white/80 via-transparent to-transparent',
          rim: 'border-[#FDDde6]/50',
          svgFill: 'url(#grad-rosegold)',
          filter: 'drop-shadow(0px 0px 20px rgba(183,110,121,0.3))'
        };
      case 'gold':
        return {
          base: 'bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#685518]',
          shine: 'from-white/80 via-transparent to-transparent',
          rim: 'border-[#FFF8D6]/50',
          svgFill: 'url(#grad-gold)',
          filter: 'drop-shadow(0px 0px 15px rgba(212,175,55,0.2))'
        };
      case 'silver':
        return {
          base: 'bg-gradient-to-b from-[#F2F2F2] via-[#C0C0C0] to-[#505050]',
          shine: 'from-white/90 via-transparent to-transparent',
          rim: 'border-white/50',
          svgFill: 'url(#grad-silver)',
          filter: 'drop-shadow(0px 0px 15px rgba(192,192,192,0.2))'
        };
    }
  };

  const style = getGradient();

  return (
    <div className="w-full h-full relative flex flex-col items-center select-none pointer-events-none">
      <svg 
        viewBox="0 0 100 200" 
        className={`w-full h-full ${isMain ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}
        preserveAspectRatio="xMidYMax"
        style={{ filter: style.filter }}
      >
        <defs>
          <linearGradient id="grad-rosegold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8a4b53', stopOpacity: 1 }} />
            <stop offset="20%" style={{ stopColor: '#eac4c9', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#b76e79', stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: '#5c3036', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2b1216', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8a7024', stopOpacity: 1 }} />
            <stop offset="20%" style={{ stopColor: '#fbe8a6', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: '#685518', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3d310e', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-silver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#7a7a7a', stopOpacity: 1 }} />
            <stop offset="20%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: '#505050', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2b2b2b', stopOpacity: 1 }} />
          </linearGradient>

          {/* Shine Gradient for highlights */}
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.6 }} />
            <stop offset="40%" style={{ stopColor: 'white', stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* 
          Drawing the complex "Alien/Crown" shape of the tee from the reference 
          This is a custom path tracing the visual from the screenshot.
          Shape: Wide Y-top with curved horns, tapering to a central column with structural ribs.
        */}
        
        {/* Main Body */}
        <path 
          d="
            M 20 10 
            C 20 10, 35 30, 45 40 
            L 45 190 
            C 45 195, 55 195, 55 190 
            L 55 40 
            C 65 30, 80 10, 80 10 
            L 80 5 
            C 80 5, 50 15, 50 15 
            C 50 15, 20 5, 20 5 
            Z
          " 
          fill={style.svgFill}
        />

        {/* Stylized Structural Ribs / Details to match the "forged" look */}
        <path 
          d="M 45 40 Q 50 50 55 40 L 55 90 Q 50 85 45 90 Z" 
          fill="rgba(0,0,0,0.2)" 
        />
         <path 
          d="M 50 15 L 50 45" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="1"
        />

        {/* Top Rim Highlight */}
        <path 
          d="M 20 5 C 30 8, 70 8, 80 5" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.5" 
          opacity="0.8"
        />

        {/* Specular Highlight on Left */}
        <path 
          d="M 25 10 C 35 25, 46 35, 46 150 L 48 150 C 48 35, 38 25, 28 10 Z" 
          fill="url(#shine)" 
          opacity="0.5"
        />

      </svg>
    </div>
  );
};

export default Tee3D;