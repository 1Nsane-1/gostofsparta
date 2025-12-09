import React from 'react';

const RunicDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-16 opacity-50">
      <div className="h-px bg-stone-600 w-1/4"></div>
      <div className="px-4 text-stone-500 font-serif text-2xl tracking-[0.5em]">
        ᚠᚢᚦᚪᚱᚲ
      </div>
      <div className="h-px bg-stone-600 w-1/4"></div>
    </div>
  );
};

export default RunicDivider;