import React, { useEffect, useState } from 'react';

import CopyButton from '@/components/ui/CopyButton';
import github from '@/assets/icons/github.svg';
import preview from '@/assets/icons/preview.svg';
import Logo from '@/assets/favicon.svg';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';



const DetailsLayout: React.FC<{ layout: object | any }> = ({ layout }) => {

    const [colorArray, setColorArray] = useState<any>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const [readmeContent, setReadmeContent] = useState<string>('');

    useEffect(() => {
        const fetchReadme = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/" + layout.author + "/" + layout.name + "/main/README.md");
                setReadmeContent(response.data);

            } catch (error) {
                console.error('Error fetching README:', error);
            }
        };

        if (layout.readme) {
            fetchReadme();
        }
    }, [layout.readme]);

    useEffect(() => {
        if (layout && layout.color_palette)
            setColorArray(Object.values(layout.color_palette).map(color => ({ color })));
    }, [layout]);


    const handleMouseEnter = (index: number) => {

        setCurrentImageIndex(index);
    };

    const handleMouseLeave = () => {

        setCurrentImageIndex(-1);
    };
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

    return (
        <div className="w-full flex flex-col items-start p-20">
            <h1 className="text-2xl font-bold mb-4">{layout.name}</h1>

            <div className="w-full">
                <ul className="flex w-full justify-center">
                    {layout.images && layout.images.length > 0 && layout.images.map((image: string | undefined, index: number) => (
                        <li
                            key={index}
                            className={`relative cursor-pointer ${currentImageIndex === index ? 'w-80 h-80' : 'w-40 h-40'} transition-all duration-200`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}

                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"

                                style={{ filter: currentImageIndex !== index ? 'grayscale(100%)' : 'none' }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-row w-full  relative h-5 mt-5 mb-5'>
                <div className={`absolute border border-zinc-500/50 bg-zinc-400/20 p-2 rounded-xl gap-2 left-0  mr-10 flex justify-between items-center `}>
                    {layout.live_preview && (
                        <div>
                            <a type="button" href={layout.live_preview} className="text-white text-md  rounded-xl">
                                <img src={preview} alt="Preview" className="w-8 h-8 inline-block" />
                            </a>
                        </div>
                    )}
                    <div>
                        <a type="button" href={layout.repository} className="text-white text-md  rounded-xl">
                            <img src={github} alt="Github" className="w-8 h-8 inline-block" />
                        </a>
                    </div>
                </div>
                <div className={`absolute left-40`}>
                    <CopyButton npmCommand={`npx open-layout get ${layout.name}`} />
                </div>
                <div className={`${languageImages.length == 0 ? 'invisible' : ''} absolute p-2 border-2  right-0 border-zinc-500/50 bg-zinc-400/10 flex flex-row gap-1 rounded-lg transition hover:border-zinc-400/50 hover:bg-zinc-300/10 `}>
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
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full mt-5">
                <div className='border border-zinc-500/50 bg-zinc-400/20 rounded-xl p-4 '>
                    <h2 className="text-xl font-bold mb-4 text-center">Readme</h2>
                    <Markdown>{readmeContent}</Markdown>
                </div>
                <div className='border border-zinc-500/50 bg-zinc-400/20 rounded-xl p-4 mb-5 '>
                    <div className='flex flex-row gap-5 items-center border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl'>
                        <h2 className=' items-center'>
                            Author:
                        </h2>
                        <a>
                            {layout.author}
                        </a>
                    </div>
                    {colorArray && colorArray.length > 0 && (
                        <div>
                            <h2 className="mt-5 mb-4">Color Palette:</h2>
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl flex flex-row'>

                                {colorArray?.map((color: { color: string; }, index: React.Key | null | undefined) => (
                                    <>
                                        <div
                                            key={index}
                                            className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full mr-3 group/color"
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(color.color);

                                                const firstChild = e.currentTarget.firstChild;

                                                if (firstChild) {
                                                    firstChild.textContent = 'Copied!';
                                                    setTimeout(() => { firstChild.textContent = color.color.toString() }, 1000);
                                                }
                                            }}
                                            style={{ backgroundColor: color.color as string }}
                                        >
                                            <p className="hidden text-white text-xs group-hover/color:block -translate-y-8 bg-gray-800/50 px-2 rounded-md border" style={{ borderColor: color.color }}>{color.color}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='border border-zinc-500/50 bg-zinc-400/10 rounded-xl p-4 mt-5 '>
                        <h2 className=" text-center font-bold">Description</h2>
                        <p>{layout.description}</p>
                    </div>
                    <div className='flex flex-col '>
                        {layout.category && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full flex flex-row gap-5 mt-5 '>
                                <h2 className='font-bold'>Category:</h2>
                                <p className='text-center'>{layout.category}</p>
                            </div>
                        )}


                        {layout.frameworks && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full flex flex-row gap-5 mt-5'>
                                <h2 className='font-bold'>Framework:</h2>
                                <p className='text-center '>{layout.frameworks}</p>
                            </div>
                        )}

                        {layout.requirements && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4  rounded-xl mt-5'>
                                <h2 className='font-bold'>Requirements:</h2>
                                <ul className='list-disc list-inside'>
                                    {layout.requirements.map((requirement: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                        <li key={index}>{requirement}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {layout.collaborators && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4  rounded-xl mt-5'>
                                <h2 className='font-bold'>Collaborators:</h2>
                                <ul className='list-disc list-inside'>
                                    {layout.collaborators.map((collaborators: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                                        <li key={index}>{collaborators}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className='flex flex-col gap-2 w-full rounded-xl border border-zinc-500/50 bg-zinc-400/10 p-2 legen mt-5' >
                            <h2 className='text-center font-bold'>Socials</h2>
                            {layout.socials?.github && (
                                <div className='  px-4 rounded-xl w-full '>
                                    <div className='flex gap-2 content-center items-center py-1'>
                                        <img src={github} alt="gh logo" className='w-6' />
                                        Github: <a href={layout.socials?.github} className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.github}</a>
                                    </div>
                                </div>
                            )}
                            {layout.socials?.discord && (
                                <div className='px-4 rounded-xl w-full '>
                                    Discord: <span className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.discord}</span>
                                </div>
                            )}
                            {layout.socials?.x && (
                                <div className='  px-4 rounded-xl w-full mb-8 '>
                                    X (Twitter): <a href={layout.socials?.x} className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.x}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsLayout;
