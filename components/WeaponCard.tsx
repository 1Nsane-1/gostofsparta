import React from 'react';
import { Weapon } from '../types';

interface WeaponCardProps {
  weapon: Weapon;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon }) => {
  const getGlowColor = () => {
    switch (weapon.element) {
      case 'ice': return 'group-hover:shadow-[0_0_30px_rgba(165,242,243,0.4)] group-hover:border-nordic-ice';
      case 'fire': return 'group-hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] group-hover:border-chaos-fire';
      case 'wind': return 'group-hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] group-hover:border-gold-mute';
      default: return 'group-hover:border-stone-400';
    }
  };

  const getTextColor = () => {
    switch (weapon.element) {
      case 'ice': return 'text-nordic-ice';
      case 'fire': return 'text-chaos-fire';
      case 'wind': return 'text-gold-mute';
      default: return 'text-stone-300';
    }
  };

  return (
    <div className={`group relative bg-stone-800 border-2 border-stone-700 p-6 transition-all duration-500 hover:-translate-y-2 ${getGlowColor()}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        {/* Abstract Runic Icon */}
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="text-stone-100">
           <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>
      
      <h3 className={`text-2xl font-serif font-bold mb-4 uppercase tracking-widest ${getTextColor()}`}>
        {weapon.name}
      </h3>
      
      <div className="h-1 w-12 bg-stone-600 mb-6 group-hover:w-full transition-all duration-700"></div>
      
      <p className="text-stone-400 font-sans leading-relaxed text-sm">
        {weapon.description}
      </p>

      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <span className={`text-xs uppercase tracking-widest ${getTextColor()}`}>Владеть Силой</span>
         <span className="text-lg">→</span>
      </div>
    </div>
  );
};

export default WeaponCard;