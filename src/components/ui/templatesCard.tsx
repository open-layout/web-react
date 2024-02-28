import React, { useEffect, useState } from 'react';
import IconGithub from '@icons/github.svg';
import IconMarkdown from '@/assets/languages/md.svg';
import IconAdd from '@icons/add.svg';
import IconTrash from '@icons/trash.svg';

const TemplatesCard: React.FC<{
  repo: object | any;
  isAdded: boolean;
  banner: string;
  togglePopup: () => void;
}> = ({ repo, isAdded, banner, togglePopup }) => {
  const [languageImage, setLanguageImage] = useState<string | null>(null);

  useEffect(() => {
    const loadLanguageImage = async () => {
      try {
        const imageModule = await import(
          `../../assets/languages/${repo.language}.svg`
        );

        setLanguageImage(imageModule.default);
      } catch (error) {
        console.error('Error loading language image:', error);
      }
    };

    if (repo.language) {
      loadLanguageImage();
    }
  }, [repo.language]);

  const sanitize_name = (name: string): string => {
    return name.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  return (
    <article className="relative flex w-[22rem] flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-white shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-title">
        <img src={banner} alt="" className="h-full aspect-[22/9]" />
        {repo.language && (
          <img
            src={repo.owner === repo.name ? IconMarkdown : languageImage}
            className="absolute right-0 w-9 h-9 bg-code/30 backdrop-blur-xl m-1 py-1 px-2 rounded-md border border-gray-500"
            alt={`${repo.language}`}
            title={`${repo.language || 'Markdown'}`}
          />
        )}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {sanitize_name(repo.name) || 'Unknown'}
        </h5>
        <p className="template-card-description block font-sans text-base font-light leading-relaxed text-inherit antialiased max-h-32 min-h-32 overflow-y-auto border-[3px] border-zinc-500/50 p-2 rounded-lg bg-zinc-400/10">
          {repo.description || 'No description yet'}
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-row gap-2">
        <a
          data-ripple-light="true"
          href={repo.url}
          target="_blank"
          className="bottom-0 flex items-center justify-center w-1/2 group select-none rounded-lg bg-title/80 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-title/20 transition-all hover:shadow-lg hover:shadow-title/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Github
          <img
            src={IconGithub}
            className="w-6 inline-block ml-2 group-hover:animate-bounce transition-all duration-300 ease-in-out"
            alt="Github Icon"
          />
        </a>
        {isAdded ? (
          <a className="bottom-0 flex items-center justify-center w-1/2 group select-none rounded-lg bg-gray-400/80 cursor-not-allowed py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-400/20 transition-all hover:shadow-lg hover:shadow-gray-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">
            Delete
            <img
              src={IconTrash}
              className="w-6 inline-block ml-2"
              alt="Add Icon"
            />
          </a>
        ) : (
          <a
            className="bottom-0 flex items-center justify-center w-1/2 group select-none rounded-lg bg-emerald-400/80 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-emerald-400/20 transition-all hover:shadow-lg hover:shadow-emerald-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={togglePopup}>
            Add
            <img
              src={IconAdd}
              className="w-6 inline-block ml-2 group-hover:animate-bounce transition-all duration-300 ease-in-out"
              alt="Add Icon"
            />
          </a>
        )}
      </div>
    </article>
  );
};

export default TemplatesCard;
