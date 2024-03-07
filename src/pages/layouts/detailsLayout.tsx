import React, { useEffect, useState } from 'react';

import CopyButton from '@/components/ui/CopyButton';
import github from '@/assets/icons/github.svg';
import preview from '@/assets/icons/preview.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailsLayout: React.FC<{ layout: object | any }> = ({ layout }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [colorArray, setColorArray] = useState<any>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (layout && layout.color_palette) {
            setColorArray(Object.values(layout.color_palette).map(color => ({ color })));
            console.log('Color array:', colorArray);
        }
    }, [layout]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (layout.images?.length ?? 0));
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (layout.images?.length ?? 0)) % (layout.images?.length ?? 0));
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="w-full flex flex-col items-start p-20">
            <h1 className="text-2xl font-bold mb-4">{layout.name}</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 w-full">
                <div>
                    {layout.images?.length && layout.images?.length > 0 && (
                        <div className="mt-2 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img
                                src={layout.images?.[currentImageIndex]}
                                alt="Preview"
                                className="block mx-auto"
                                style={{ maxWidth: '100%', maxHeight: '300px' }} // Ajusta la altura máxima según sea necesario
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
                                <button type="button" onClick={handlePrevImage} className="text-white ml-5 text-4xl">&#10094;</button>
                                <button type="button" onClick={handleNextImage} className="text-white mr-5 text-4xl">&#10095;</button>
                            {layout.live_preview && (
                                <div className={`absolute bottom-0 left-0 mb-5 ml-10  ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                <a type="button" href={layout?.live_preview} className="text-white text-md  rounded-xl">
                                        <img src={preview} alt="github" className="w-8 h-8 inline-block" />

                                    </a>
                                </div>
                            )}
                                
                                <div className={`absolute bottom-0 right-0 mb-5 mr-10  ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>

                                    <a type="button" href={layout?.repository} className="text-white text-md  rounded-xl">
                                        <img src={github} alt="github" className="w-8 h-8 inline-block" />

                                    </a>
                                </div>
                            </div>

                        </div>

                    )}
                    <div className={` mb-5 mt-5`}>
                        <CopyButton npmCommand={`npx open-layout get ${layout.name}`} />
                    </div>
                    {layout.readme && (
                        <div>
                            <p>Readme:</p>
                            <a type="button" href={layout?.repository+"/blob/main/README.md"} className="bg-title text-white py-2 px-4 rounded-xl w-32  ">
                                readme
                            </a>
                        </div>
                    )}
                    {colorArray && colorArray.length > 0 && (
                        <div>
                            <p className="mt-8 mb-4">Color Palette:</p>
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
                </div>
                {layout.description && (
                    <div className='flex flex-col gap-5'>
                        <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-48 rounded-xl'>
                            <p className="mb-4">Description:</p>
                            <p className='text-white'>{layout.description}<a className='text-blue-500 hover:cursor-pointer' href={layout.docs}> watch docs...</a></p>
                        </div>
                        <div className='flex flex-row gap-5 w-full ' >
                            {layout.category && (
                                <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full '>
                                    <p>Category:</p>
                                    <p className='text-center mt-2'>{layout.category}</p>
                                </div>
                            )}
                            {layout.frameworks && (
                                <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 rounded-xl w-full'>
                                    <p>Framework:</p>
                                    <p className='text-center mt-2'>{layout.frameworks}</p>
                                </div>
                            )}
                        </div>
                        {layout.requirements && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-32 rounded-xl'>
                                <p>Requirements:</p>
                                <p className='text-left mt-2'>{layout.requirements}</p>
                            </div>
                        )}
                        {layout.collaborators && (
                            <div className='border border-zinc-500/50 bg-zinc-400/10 p-4 h-32 rounded-xl'>
                                <p>Collaborators:</p>
                                <p className='text-left mt-2'>{layout.collaborators}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="xl:col-start-3 xl:col-span-1 flex flex-col gap-5">
                    {layout.tutorial && (
                        <div>
                            {
                                (layout.tutorial.endsWith('.mp4') || 
                                layout.tutorial.endsWith('.gif') ||
                                layout.tutorial.endsWith('.webmp')) ? (
                                    <video className="w-full h-auto object-center rounded-md mb-4" src={layout.tutorial} controls />
                                ) : (
                                    <>
                                    <iframe allowFullScreen={true} src={layout?.tutorial} allowTransparency={true}/>
                                    {/* <img className="w-full h-auto object-center rounded-md mb-4" src={layout.tutorial} alt="tutorial" /> */}
                                    </>
                                )
                            }
                        </div>
                    )}

                    <div className='flex flex-col gap-2 w-full rounded-xl border border-zinc-500/50 bg-zinc-400/10 p-2 legen' >
                        <h2 className='text-center text-2xl'>Socials</h2>
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
    );
};

export default DetailsLayout;
