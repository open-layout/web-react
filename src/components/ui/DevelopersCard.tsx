import React, { useState, useEffect } from 'react';

import { PresentationCardProps } from '@/pages/landing/interfaces';
import GitHubIcon from '@icons/github.svg';

const PresentationCard: React.FC<PresentationCardProps> = ({
  name,
  description,
  image,
  link,
  badges,
}) => {
  const [badgeUrls, setBadgeUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchBadgeUrls = async () => {
      const urls = await Promise.all(
        badges.map(async (badge) => {
          const badgeUrl = await import(`../../assets/badges/${badge.id}.svg`).catch(() => { console.error('Could not load badge:', badge.id) });
          if (!badgeUrl) return '';
          return badgeUrl.default;
        })
      );
      setBadgeUrls(urls);
    };

    fetchBadgeUrls();
  }, [badges]);

  return (
    <div className="select-none group flex flex-col justify-start items-start gap-2 w-full max-w-96 h-56 duration-500 relative rounded-xl p-4 bg-gray-800/50 border-2 border-gray-700  backdrop-blur-xl hover:-translate-y-2 hover:shadow-xl shadow-gray-800">
      <img
        src={image}
        alt={`${name}'s pfp`}
        className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-5 -right-5 w-20 rounded-lg bg-gray-800"
      />

      <div className="">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-2 text-gray-100">{name}</h2>
          {badgeUrls.map((badgeUrl, index) => (<img key={index} src={badgeUrl} alt="badge" className="w-6 h-6" />))}
        </div>
        <p className="text-gray-200 line-clamp-3">{description}</p>
      </div>
      <a
        href={link}
        target="_blank"
        className="flex gap-2 items-center group/gh hover:bg-gray-800 bg-gray-900 border border-gray-700 text-gray-100 transition-colors duration-200 mt-6 rounded-lg p-2 px-6 absolute bottom-5 left-5">
          <img src={GitHubIcon} alt="github" className='w-8 transition duration-300 delay-75 group-hover/gh:translate-x-6' />
          <span className='transition duration-200 group-hover/gh:-translate-x-5 group-hover/gh:scale-50 group-hover/gh:opacity-0'>Github</span>
      </a>
    </div>
  );
};

export default PresentationCard;
