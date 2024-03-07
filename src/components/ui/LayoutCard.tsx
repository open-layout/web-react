import React, { useEffect, useState } from 'react';

import Banner from '@/assets/banner.svg';
import Logo from '@/assets/favicon.svg';
import IconGithub from '@icons/github.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LayoutCard: React.FC<{ layout: object | any }> = ({ layout }) => {
  const [languageImages, setLanguageImages] = useState<
    { language: string; image: string }[]
  >([]);

  useEffect(() => {
    const loadLanguageImages = async () => {
      try {
        const languageImages = await Promise.all(
          layout.languages.map(async (language: string) => {
            const imageModule = await import(
              `../../assets/languages/${language}.svg`
            );
            return { language, image: imageModule.default };
          })
        );
        setLanguageImages(languageImages);
      } catch (error) {
        console.error('Error loading language images:', error);
      }
    };

    if (layout.languages && layout.languages.length > 0) {
      loadLanguageImages();
    }
  }, [layout.languages]);

  const sanitize_name = (name: string): string => {
    return name.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  return (
    <article className="relative flex group mx-4 w-[22rem] 2xl:w-[27rem] flex-col rounded-2xl bg-zinc-800/40 backdrop-blur-lg text-white shadow-md border-[3px] border-zinc-700/50 trainsition duration-200 ease-in hover:bg-zinc-600/40 hover:border-zinc-400/50">
      <div className="flex justify-center relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-code transition duration-200 group-hover:-translate-y-8">
        <img
          src={layout.images[0]}
          alt=""
          onError={(e) => {
            e.currentTarget.src = Banner;
            e.currentTarget.style.filter = 'blur(4px)';
          }}
          className="aspect-[22/9] group-hover:scale-110 duration-300 transition-transform"
        />
      </div>
      <div className="px-5 py-2">
        <h5 className="mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased transition text-transparent bg-gradient-to-r from-gray-400 to-white bg-clip-text group-hover:text-white">
          {sanitize_name(layout.name) || 'No name'}
        </h5>
        <p className="layout-desc overflow-hidden font-sans text-base font-light h-48 border-2 border-zinc-500/50 p-2 rounded-lg bg-zinc-400/10">
          {layout.description || 'No description yet'}
        </p>
      </div>
      <div className="mx-5 mb-2 flex flex-row justify-between items-center">
          <div className={`${languageImages.length == 0 ? 'invisible' : ''} px-2 py-1 border-2 border-zinc-500/50 bg-zinc-400/10 flex flex-row gap-1 rounded-lg transition hover:border-zinc-400/50 hover:bg-zinc-300/10`}>
            {languageImages.map((languageImage, index) => (
              <img
                key={index}
                src={languageImage.image}
                onError={(e) => {
                  e.currentTarget.src = Logo;
                }}
                alt={languageImage.language}
                className="w-7 h-7 transition hover:scale-105 hover:shadow-lg delay-200 hover:animate-pulse"
              />
            ))}
          </div>
        <a
          data-ripple-light="true"
          href={`https://github.com/${layout.author}`}
          target="_blank"
          className="cursor-pointer group/dev px-6 py-2 self-end text-md font-bold flex flex-row-reverse gap-2 text-transparent bg-gradient-to-r from-white to-gray-600 bg-clip-text animate-gradient-x transition duration-500 hover:text-white hover:underline">
          {`@${layout.author}` || 'Unknown'}
          <img
            src={IconGithub}
            className="w-6 inline-block ml-2 transition duration-500 opacity-65 group-hover/dev:opacity-100"
            alt="Github Icon"
          />
        </a>
      </div>
    </article>
  );
};

export default LayoutCard;
