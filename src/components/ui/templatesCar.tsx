import React, { useEffect, useState } from 'react';
import webicon from '@/assets/web.png';
import IconGithub from '@icons/github.svg';
import IconMarkdown from '@/assets/languages/markdown.svg';
import IconAdd from '@icons/add.svg';

const TemplatesCard: React.FC<{ repo: object | any }> = ({ repo }) => {
  const [languageImage, setLanguageImage] = useState<string | null>(null);
  const [showAddButton, setShowAddButton] = useState<boolean>(false);

  // Function to get the date in MM-DD-YYYY format
  const getFormattedDate = (date: string): string => {
    const parts = date.split('T')[0].split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    const loadLanguageImage = async () => {
      try {
        const imageModule = await import(
          `../../assets/languages/${repo.language.toLowerCase()}.svg`
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
  }

  return (
    <article className="relative flex w-80 flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-white shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-title">
        <img src={webicon} alt="" className="h-full" />
        <img
            src={languageImage || IconMarkdown}
            className="w-9 h-9 bg-code/70 backdrop-blur-xl m-1 py-1 px-2 rounded-md border border-gray-700"
            alt={`${repo.language}`}
            title={`${repo.language || 'Markdown'}`}
          />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {sanitize_name(repo.name) || 'Unknown'}
        </h5>
        <p className="template-card-description block font-sans text-base font-light leading-relaxed text-inherit antialiased max-h-32 min-h-32 overflow-y-auto border-[3px] border-zinc-500/50 p-2 rounded-lg bg-zinc-400/10">
          {repo.description || 'No description yet'}
        </p>
      </div>
      <div className="p-6 pt-0">
        <a
          data-ripple-light="true"
          href={repo.html_url}
          className="bottom-0 select-none rounded-lg bg-title/80 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-title/20 transition-all hover:shadow-lg hover:shadow-title/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Github
        </a>
      </div>
    </article>

    // <article
    //   className="group backdrop-blur-md border border-title px-3 py-4 rounded-xl w-80 relative flex flex-col justify-between"
    //   onMouseEnter={() => setShowAddButton(true)}
    //   onMouseLeave={() => setShowAddButton(false)}>
    //   <div className="flex flex-col gap-4">
    //     <div className="justify-between items-center">
    //       <img
    //         className="rounded-md border border-title shadow-2xl h-32 w-full bg-slate-400"
    //         src={webicon}
    //         alt="Web Icon"
    //       />
    //     </div>
    //     <div className="text-md flex justify-between items-center px-1">
    //       <img
    //         src={languageImage || IconMarkdown}
    //         className="w-9 bg-code py-1 px-2 rounded-md border border-gray-700"
    //         alt={`${repo.language}`}
    //         title={`${repo.language || 'Markdown'}`}
    //       />
    //       <h2 className="text-xl">{repo.name}</h2>
    //     </div>

    //     <p className="text-sm pl-1">
    //       {repo.description || 'No description yet'}
    //     </p>
    //   </div>
    //   <div className="flex flex-row items-baseline justify-between">
    //     <p className="text-gray-500">{getFormattedDate(repo.created_at)}</p>{' '}
    //     <div className="flex flex-row justify-end items-center gap-2 mt-2">
    //       <a
    //         href={repo.html_url}
    //         className="hover:scale-105 transform transition duration-300 ease-in-out"
    //         target="_blank"
    //         rel="noopener noreferrer">
    //         <img src={IconGithub} className="w-10" alt="Github Icon" />
    //       </a>
    //     </div>
    //   </div>
    //   {showAddButton && (
    //     <a
    //       className="absolute backdrop-blur-xl w-16 p-2 border border-title rounded-xl -right-5 -top-5 hover:scale-105 transform transition duration-300 ease-in-out"
    //       target="_blank"
    //       rel="noopener noreferrer">
    //       <img src={IconAdd} alt="Add Layout" />
    //     </a>
    //   )}
    // </article>
  );
};

export default TemplatesCard;
