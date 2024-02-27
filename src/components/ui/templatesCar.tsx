import React, { useEffect, useState } from 'react';
import IconGithub from '@icons/github.svg';
import IconMarkdown from '@/assets/languages/markdown.svg';
import IconAdd from '@icons/add.svg';
import IconTrash from '@icons/trash.svg';
import Form from './LayoutsForm';
import Quit from '@/assets/icons/quit.svg';

const TemplatesCard: React.FC<{
  repo: object | any;
  isAdded: boolean;
  banner: string;
}> = ({ repo, isAdded, banner }) => {
  const [languageImage, setLanguageImage] = useState<string | null>(null);
  // const [showAddButton, setShowAddButton] = useState<boolean>(false);

  // Function to get the date in MM-DD-YYYY format
  // const getFormattedDate = (date: string): string => {
  //   const parts = date.split('T')[0].split('-');
  //   const year = parts[0];
  //   const month = parts[1];
  //   const day = parts[2];
  //   return `${month}-${day}-${year}`;
  // };

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar si la ventana emergente está abierta

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Cambiar el estado para abrir o cerrar la ventana emergente
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
  };

  return (
    <article className="relative flex w-[22rem] flex-col rounded-xl bg-zinc-800/40 backdrop-blur-lg text-white shadow-md border-[3px] border-zinc-700/50">
      <div className="flex justify-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r bg-title">
        <img src={banner} alt="" className="h-full" />
        <img
          src={languageImage || IconMarkdown}
          className="absolute right-0 w-9 h-9 bg-code/30 backdrop-blur-xl m-1 py-1 px-2 rounded-md border border-gray-500"
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
      <div className="p-6 pt-0 flex flex-row gap-2">
        <a
          data-ripple-light="true"
          href={repo.html_url}
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
          <a className="bottom-0 flex items-center justify-center w-1/2 group select-none rounded-lg bg-red-400/80 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-red-400/20 transition-all hover:shadow-lg hover:shadow-red-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " onClick={togglePopup}>
            Delete
            <img
              src={IconTrash}
              className="w-6 inline-block ml-2"
              alt="Add Icon"
            />
          </a>
        ) : (
          <div>
            <a className="bottom-0 flex items-center justify-center w-1/2 group select-none rounded-lg bg-emerald-400/80 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-emerald-400/20 transition-all hover:shadow-lg hover:shadow-emerald-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={togglePopup}>
              Add
              <img
                src={IconAdd}
                className="w-6 inline-block ml-2"
                alt="Add Icon"
              />
            </a>
            {isPopupOpen && (
              <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                <div className="bg-transparent p-8 rounded-lg shadow-md">
                  <Form target={repo.html_url}/>
                  <a onClick={togglePopup}>
                    <img src={Quit} className='w-10 absolute top-0 right-0 mt-12'/>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default TemplatesCard;
