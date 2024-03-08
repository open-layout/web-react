import React from 'react';

import IconGithub from '@icons/github.svg';

const LayoutCardSkeleton: React.FC = () => {
  return (
    <article className="relative flex group w-[22rem] 2xl:w-[27rem] flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-code shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-code shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-code">
        <div className=" animate-pulse aspect-[22/9] group-hover:scale-110 delay-75 duration-300 transition-transform bg-gray-500"></div>
      </div>
      <div className="p-6">
        {/* Simulación del título */}
        <h5 className="animate-pulse rounded-md mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased bg-gray-500 h-7 w-3/4"></h5>
        {/* Simulación de la descripción */}
        <p className="layout-desc overflow-hidden font-sans text-base font-light h-48 border-[3px] border-zinc-500/50 p-2 rounded-lg bg-zinc-500/10 bg-gray-500"></p>
      </div>
      <div className="mx-5 mb-2 flex flex-row justify-between items-center">
        <div className="px-2 py-1 border-[3px] border-zinc-500/50 bg-zinc-500/10 flex flex-row gap-1 rounded-md">
          {/* Simulación de imágenes de lenguaje */}
          <div className="w-7 h-7 bg-gray-500 rounded-md animate-pulse"></div>
          <div className="w-7 h-7 bg-gray-500 rounded-md animate-pulse"></div>
          <div className="w-7 h-7 bg-gray-500 rounded-md animate-pulse"></div>
        </div>
        {/* Simulación del enlace de GitHub */}
        <div className="cursor-pointer px-6 py-2 pb-5 self-end text-md text-gray-500 font-bold flex flex-row-reverse gap-2">
          {/* {'@User' || 'Unknown'} */}
          <p className="animate-pulse bg-gray-500 w-24 rounded-md">hola</p>
          <img
            src={IconGithub}
            className="animate-pulse filter grayscale w-6 inline-block ml-2"
            alt="Github Icon"
          />
        </div>
      </div>
    </article>
  );
};

export default LayoutCardSkeleton;
