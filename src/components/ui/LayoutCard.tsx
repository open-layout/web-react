import React, { useEffect, useState } from 'react';

import Banner from '@/assets/banner.svg';
import Logo from '@/assets/favicon.svg';
import IconGithub from '@icons/github.svg';

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
    <article className="relative flex group mx-4 w-[22rem] 2xl:w-[27rem] flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-white shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-code">
        <img
          src={layout.images[0]}
          alt=""
          onError={(e) => {
            e.currentTarget.src = Banner;
            e.currentTarget.style.filter = 'blur(4px)';
          }}
          className="aspect-[22/9] group-hover:scale-110 delay-75 duration-300 transition-transform"
        />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {sanitize_name(layout.name) || 'No name'}
        </h5>
        <p className="layout-desc overflow-hidden font-sans text-base font-light h-48 border-[3px] border-zinc-500/50 p-2 rounded-lg bg-zinc-400/10">
          {layout.description || 'No description yet'}
        </p>
      </div>
      <div className="mx-5 mb-2 flex flex-row justify-between items-center">
          <div className={`${languageImages.length == 0 ? 'invisible' : ''} px-2 py-1 border-[3px] border-zinc-500/50 bg-zinc-400/10 flex flex-row gap-1 rounded-md`}>
            {languageImages.map((languageImage, index) => (
              <img
                key={index}
                src={languageImage.image}
                onError={(e) => {
                  e.currentTarget.src = Logo;
                }}
                alt={languageImage.language}
                className="w-7 h-7"
              />
            ))}
          </div>

        <a
          data-ripple-light="true"
          href={`https://github.com/${layout.author}`}
          target="_blank"
          className="cursor-pointer px-6 py-2 pb-5 self-end text-md dark:text-gray-400 text-gray-600 font-bold flex flex-row-reverse gap-2">
          {`@${layout.author}` || 'Unknown'}
          <img
            src={IconGithub}
            className="w-6 inline-block ml-2"
            alt="Github Icon"
          />
        </a>
      </div>
    </article>
  );
};

export default LayoutCard;
