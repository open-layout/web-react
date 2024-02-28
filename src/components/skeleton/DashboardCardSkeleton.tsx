import React from 'react';

const DashboardCardSkeleton: React.FC = () => {
  return (
    <article className="relative flex group w-[22rem] flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-code shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-36 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-code shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-code">
        <div className="animate-pulse aspect-[22/9] group-hover:scale-110 delay-75 duration-300 transition-transform bg-gray-500"></div>
      </div>
      <div className="p-6">
        <h5 className="animate-pulse rounded-md mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased bg-gray-500 h-7 w-3/4"></h5>
        <p className="layout-desc overflow-hidden font-sans text-base font-light h-48 border-[3px] border-zinc-500/50 p-2 rounded-lg bg-zinc-500/10 bg-gray-500"></p>
      </div>
      <div className="mx-5 mb-2 flex flex-row justify-between items-center gap-2">
        <div className="text-white bottom-0 flex h-12 items-center justify-center w-1/2 group select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-title/20 transition-all hover:shadow-lg hover:shadow-title/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"></div>
        <div className="animate-pulse bottom-0 flex h-12 items-center justify-center w-1/2 group select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-title/20 transition-all hover:shadow-lg hover:shadow-title/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"></div>
      </div>
    </article>
  );
};

export default DashboardCardSkeleton;
