import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import CopyButton from '@/components/ui/CopyButton';
import github from '@/assets/icons/github.svg';
import preview from '@/assets/icons/preview.svg';
import banner from '@/assets/banner.svg';
import Logo from '@/assets/favicon.svg';
import Markdown from 'markdown-to-jsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailsLayout: React.FC<{ layout: object | any }> = ({ layout }) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [colorArray, setColorArray] = useState<any>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageStatus, setImageStatus] = useState<boolean[]>([]);

    const [readmeContent, setReadmeContent] = useState<string>('');

    useEffect(() => {
        const fetchReadme = async () => {
            try {                           // Just for testing
                const response = await fetch("https://corsproxy.io/?https://raw.githubusercontent.com/" + layout.author + "/" + layout.name + "/main/README.md", { // https://corsproxy.io/?
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.text();

                setReadmeContent(data);
            } catch (error) {
                console.error('Error fetching README:', error);
            }
        };

        if (layout.readme)
            fetchReadme();
    }, [layout.readme]);

    useEffect(() => {
        if (layout && layout.color_palette)
            setColorArray(Object.values(layout.color_palette).map(color => ({ color })));
    }, [layout]);


    // const handleMouseEnter = (index: number) => {
    //     setCurrentImageIndex(index);
    // };

    // const handleMouseLeave = () => {
    //     setCurrentImageIndex(-1);
    // };
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

    useEffect(() => {
        console.log(layout.images);
    }, [layout.images]);

    return (
        <div className="w-full flex flex-col items-start p-5 pt-20 md:p-20">
            <h1 className="absolute text-2xl font-bold m-2 px-2 bg-zinc-800/70 border border-zinc-700 drop-shadow-2xl rounded-xl z-10">{layout.name}</h1>

            <div className="w-full">
                <ul className="flex justify-center h-80 rounded-lg overflow-hidden bg-zinc-700/20 border border-zinc-700/50">
                    {layout.images && layout.images.length > 0 ? layout.images.map((image: string | undefined, index: number) => (
                        <li
                            key={index}
                            className="cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                        // onMouseEnter={() => handleMouseEnter(index)}
                        // onMouseLeave={handleMouseLeave}

                        >
                            <motion.img
                                src={image}
                                onError={(e) => { console.log(index, e); layout.images.splice(index, 1); e.currentTarget.remove(); imageStatus[index] = false; setImageStatus(imageStatus) }}
                                onLoad={() => { imageStatus[index] = true; setImageStatus(imageStatus) }}

                                alt={`Image ${index + 1}`}
                                className={`h-full object-cover transition-all duration-500 ease-in-out ${!imageStatus[index] && 'hidden'}`}

                                initial="unselected"
                                animate={currentImageIndex === index ? "selected" : "unselected"}
                                variants={{
                                    unselected: {
                                        filter: 'grayscale(100%) blur(3px)',
                                        width: '200px',
                                        transition: {
                                            duration: .5
                                        }
                                    },
                                    selected: {
                                        filter: 'none',
                                        aspectRatio: '22/9',
                                        width: window.innerWidth,
                                        transition: {
                                            duration: .5
                                        }
                                    },
                                }}
                                // style={{
                                //     filter: currentImageIndex !== index ? 'grayscale(100%) blur(3px)' : 'none',
                                //     width: currentImageIndex === index ? window.innerWidth * 4 : 'auto',
                                // }}
                            />
                        </li>
                    )) : (
                        <li className='w-full'>
                            <img src={banner} className='object-center' alt="Ol Banner" />
                        </li>
                    )}
                </ul>
            </div>
            <div className='flex flex-row w-full mt-5'>
                <div className={`border border-zinc-500/50 bg-zinc-400/20 p-2 rounded-xl gap-2 left-0 mr-4 flex justify-between items-center `}>
                    {layout.live_preview && (
                        <div>
                            <a type="button" href={layout.live_preview} target="_blank" rel="noopener noreferrer" className="text-white text-md  rounded-xl">
                                <img src={preview} alt="Preview" className="w-8 h-8 inline-block" />
                            </a>
                        </div>
                    )}
                    <div>
                        <a type="button" href={layout.repository} target="_blank" rel="noopener noreferrer" className="text-white text-md  rounded-xl">
                            <img src={github} alt="Github" className="w-8 h-8 inline-block" />
                        </a>
                    </div>
                </div>
                <CopyButton npmCommand={`npx open-layout get ${layout.name}`} />
                <div className={`${languageImages.length == 0 ? 'invisible' : ''} ml-auto p-2 border-2 border-zinc-500/50 bg-zinc-400/10 flex flex-row gap-1 rounded-lg transition hover:border-zinc-400/50 hover:bg-zinc-300/10 `}>
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

            <div className="flex flex-col-reverse lg:flex-row gap-10 w-full mt-5">
                {/* Left markdow content */}
                <div className='mx-auto border border-zinc-500/50 bg-zinc-400/20 rounded-xl p-4 col-span-2'>
                    <Markdown
                        options={{
                            wrapper: 'article',
                            forceWrapper: true,
                            disableParsingRawHTML: true
                        }}
                        style={{ maxWidth: 'none', width: '100%', height: '100%' }}
                        className="prose prose-invert prose-indigo text-white overflow-auto">
                        {readmeContent}
                    </Markdown>
                </div>

                {/* Right details */}
                <div className='flex flex-col md:flex-row lg:block ml-auto border h-min border-zinc-500/50 bg-zinc-400/20 rounded-xl p-4 w-full lg:w-1/3'>
                    <div className='flex flex-col md:mr-auto'>
                            <div className='flex flex-row gap-2 items-start border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl'>
                                <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Author</span>
                                <a href={"https://github.com" + layout.author} target="_blank" rel="noopener noreferrer" className='text-sm text-zinc-300 my-auto'>
                                    {layout.author}
                                </a>
                            </div>
                            {colorArray && colorArray.length > 0 && (
                                <div>
                                    <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl flex flex-row  mt-5'>
                                        <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Colors</span>

                                        {colorArray?.map((color: { color: string; }, index: number) => (
                                            <div
                                                key={index}
                                                className="w-10 h-10 mx-auto flex items-center justify-center border border-gray-400 rounded-full group/color"
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
                                        ))}
                                    </div>
                                </div>
                            )}
                        <div className='border border-zinc-500/50 bg-zinc-400/10 rounded-xl p-4 mt-5 h-full'>
                            <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Description</span>
                            <p className='text-sm text-zinc-300'>{layout.description}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:ml-auto'>
                        {layout.category && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full flex flex-row gap-2 mt-5 '>
                                <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Category</span>
                                <p className='text-center text-sm text-zinc-300 my-auto'>{layout.category}</p>
                            </div>
                        )}

                        {layout.frameworks && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full flex flex-row gap-2 mt-5'>
                                <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Framework/s</span>
                                <p className='text-center text-sm text-zinc-300 my-auto'>{layout.frameworks}</p>
                            </div>
                        )}

                        {layout.requirements && layout.requirements.length !== 0 && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 flex gap-2 p-4 rounded-xl mt-5'>
                                <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Requirements</span>
                                <p className='text-sm text-zinc-300 my-auto truncate'>
                                    {layout.requirements.join(', ')}
                                </p>
                            </div>
                        )}
                        {layout.collaborators && layout.collaborators.length !== 0 && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4  rounded-xl mt-5'>
                                <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Collaborators</span>

                                <ul className='list-disc list-inside'>
                                    {layout.collaborators.map((collaborator: string, i: number) => (
                                        <li key={i} className='text-sm text-zinc-300'><a href={"https://github.com/" + collaborator} target="_blank" rel="noopener noreferrer">{collaborator}</a></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className='flex flex-col gap-2 w-full rounded-xl border border-zinc-500/50 bg-zinc-400/10 p-4 legen mt-5 overflow-hidden'>
                            <span className='absolute -translate-y-7 -translate-x-2 bg-zinc-500/50 px-1 border border-zinc-500/50 rounded-lg font-semibold text-sm'>Socials</span>
                            {layout.socials?.github && (
                                <div className='rounded-xl w-full flex gap-2 content-center items-start py-1 whitespace-nowrap truncate'>
                                    <img src={github} alt="gh logo" className='w-6 h-6' />
                                    Github: <a href={layout.socials?.github} className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.github}</a>
                                </div>
                            )}
                            {layout.socials?.discord && (
                                <div className='rounded-xl w-full flex gap-2 content-center items-start py-1 whitespace-nowrap truncate'>
                                    Discord: <span className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.discord}</span>
                                </div>
                            )}
                            {layout.socials?.x && (
                                <div className='rounded-xl w-full flex gap-2 content-center items-start py-1 whitespace-nowrap truncate'>
                                    Twitter/x: <a href={layout.socials?.x} className="text-indigo-600 underline font-bold hover:text-indigo-400">{layout.socials?.x}</a>
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
