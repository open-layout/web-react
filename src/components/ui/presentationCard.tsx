import React from 'react';
import { PresentationCardProps } from '@/pages/LandingPage/interfaces'

const PresentationCard: React.FC<PresentationCardProps> = ({ name, description, image, link, date }) => {
    return (
        <article className="group text-white backdrop-blur-md border border-title px-2 py-4 rounded-xl w-72 h-72 relative flex flex-col gap-4">
                <img
                  className='w-20 rounded-full absolute -top-3 -left-3 border border-title shadow-2xl group-hover:rounded-xl transition-all'
                  src={image} 
                  alt={`${name}'s pfp`} 
                />
                <div className='self-end flex flex-col'>

                <p className='text-indigo-500 text-xs text-gray-600'>Since {date.split('-')[0]}</p>
                </div>
                <div className='mt-6 p-2 flex flex-col bg-title/80 rounded-md min-h-48'>
                    <h2 className="text-xl pl-3">{name}</h2>
                    <hr className='m-1'/>
                    <p className="text-gray-400 text-sm pl-3">{description}</p>
                </div>
                <a href={link} target='_blank' className=""></a>
        </article>
    );
};

export default PresentationCard;
