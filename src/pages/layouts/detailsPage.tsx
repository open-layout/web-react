import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '@/config';
import Layout from '@/components/layouts/Template';
import CopyButton from '@/components/ui/CopyButton';
import github from '@/assets/icons/github.svg';

const LayoutDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [repoDetails, setRepoDetails] = useState<any>({});
  const [colorArray, setColorArray] = useState<any>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`${config.api.baseurl}/templates/layout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        });
        const data = await response.json();
        setRepoDetails(data.data);
        if (repoDetails && repoDetails.color_palette) {
          setColorArray(Object.values(repoDetails.color_palette).map(color => ({ color })));
          console.log('Color array:', colorArray);
        }
        console.log('Repository details:', data);
      } catch (error) {
        console.error('Error fetching repository details:', error);
      }
    };

    fetchRepoDetails();
  }, [name]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (repoDetails.images?.length ?? 0));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (repoDetails.images?.length ?? 0)) % (repoDetails.images?.length ?? 0));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-start p-20 ">
        <h1 className="text-2xl font-bold mb-4">{repoDetails.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-28 w-full">
          <div>
            {repoDetails.images?.length && repoDetails.images?.length > 0 && (
              <div className="mt-2 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img
                  src={repoDetails.images?.[currentImageIndex]}
                  alt="Preview" 
                  className="block mx-auto"
                  style={{ maxWidth: '100%', maxHeight: '300px' }} // Ajusta la altura máxima según sea necesario
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
                  <button type="button" onClick={handlePrevImage} className="text-white ml-5 text-4xl">&#10094;</button>
                  <button type="button" onClick={handleNextImage} className="text-white mr-5 text-4xl">&#10095;</button>
                  <div className={`absolute bottom-0 left-0 mb-5 ml-5  ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    <button type="button" className="text-white text-md bg-title px-4 py-2 rounded-xl">{repoDetails.live_preview}</button>
                  </div>
                  <div className={`absolute bottom-0 right-0 mb-5 mr-5  ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>

                    <a type="button" href={repoDetails?.repository} className="text-white text-md  rounded-xl">
                      <img src={github} alt="github" className="w-8 h-8 inline-block" />

                    </a>
                  </div>
                </div>

              </div>

            )}
            <div className={` mb-5 mt-5`}>
              <CopyButton npmCommand={`npx open-layout get ${repoDetails.name}`} />
            </div>
            {repoDetails.readme && (
              <div>
                <p>Readme:</p>
                <button type="button" className="bg-title text-white py-2 px-4 rounded-xl w-32  ">
                  {repoDetails.readme}
                </button>
              </div>
            )}
            {colorArray && colorArray.length > 0 && (

              <div>
                <p className="mt-8 mb-4">Color Palette:</p>
                <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded flex flex-row'>

                  {colorArray?.map((color: { color: string; }, index: React.Key | null | undefined) => (
                    <div
                      key={index}
                      className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full mr-3"
                      style={{ backgroundColor: color.color as string }}
                    />
                  ))}
                </div>
              </div>
              )} 
          </div>
          {repoDetails.description && (
            <div className='flex flex-col gap-8'>
              <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-48 rounded-xl'>
                <p className="mb-4">Descripción:</p>
                <p className='text-white'>{repoDetails.description}<a className='text-blue-500 hover:cursor-pointer' href={repoDetails.docs}> watch docs...</a></p>
              </div>
              <div className='flex flex-row gap-8 w-full ' >
                {repoDetails.category && (
                  <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full '>
                    <p>Categoria:</p>
                    <p className='text-center mt-2'>{repoDetails.category}</p>
                  </div>
                )}
                {repoDetails.frameworks && (
                  <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full'>
                    <p>Framework:</p>
                    <p className='text-center mt-2'>{repoDetails.frameworks}</p>
                  </div>
                )}
              </div>
              {repoDetails.requirements && (
                <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-32 rounded-xl'>
                  <p>Requerimientos:</p>
                  <p className='text-left mt-2'>{repoDetails.requirements}</p>
                </div>
              )}
              {repoDetails.collaborators && (
                <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-32 rounded-xl'>
                  <p>Collaborators:</p>
                  <p className='text-left mt-2'>{repoDetails.collaborators}</p>
                </div>
              )}
            </div>
          )}

          {repoDetails.tutorial && (
            <div className="md:col-start-3 md:col-span-1 flex flex-col gap-20">
              <div>
                <video className="w-full h-auto object-center rounded-md mb-4" src={repoDetails.tutorial} controls />
              </div>
              <div className='flex flex-col gap-2 w-full rounded-xl border border-zinc-500/50 bg-zinc-400/10 ' >
                <h2 className='text-center text-2xl'>Socials</h2>
                <div className='  px-4 rounded-xl w-full '>
                  {repoDetails.socials?.github && (
                    <div>
                      <p>Github:</p>
                      <button type="button" className="bg-title text-white py-2 px-4 rounded-xl w-32 ">
                        {repoDetails.socials?.github}
                      </button>
                    </div>
                  )}
                </div>
                <div className='  px-4 rounded-xl w-full '>
                  {repoDetails.socials?.discord && (
                    <div>
                      <p>Discord:</p>
                      <button type="button" className="bg-title text-white py-2 px-4 rounded-xl w-32 ">
                        {repoDetails.socials?.discord}
                      </button>
                    </div>
                  )}
                </div>
                <div className='  px-4 rounded-xl w-full mb-8 '>
                  {repoDetails.socials?.x && (
                    <div>
                      <p>X:</p>
                      <button type="button" className="bg-title text-white py-2 px-4 rounded-xl w-32">
                        {repoDetails.socials?.x}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LayoutDetailsPage;
