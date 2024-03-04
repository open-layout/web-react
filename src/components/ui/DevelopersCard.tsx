import React, { useState, useEffect } from 'react';

import { PresentationCardProps } from '@/pages/landing/interfaces';

const PresentationCard: React.FC<PresentationCardProps> = ({
  name,
  description,
  image,
  link,
  badges,
}) => {
  const [, setBadgeUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchBadgeUrls = async () => {
      const urls = await Promise.all(
        badges.map(async (badge) => {
          const badgeUrl = await import(`../../assets/badges/${badge.id}.svg`);
          return badgeUrl.default;
        })
      );
      setBadgeUrls(urls);
    };

    fetchBadgeUrls();
  }, [badges]);

  return (
    <div className="select-none group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-black/60 border-2 border-gray-900  backdrop-blur-xl hover:-translate-y-2 hover:shadow-xl shadow-gray-800">
      <img
        src={image}
        alt={`${name}'s pfp`}
        className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-5 -right-5 w-20 rounded-lg bg-gray-800"
      />

      <div className="">
        <h2 className="text-2xl font-bold mb-2 text-gray-100">{name}</h2>
        <p className="text-gray-200 line-clamp-3">{description}</p>
      </div>
      <a
        href={link}
        target="_blank"
        className="hover:bg-gray-800 bg-gray-900 text-gray-100 transition-colors duration-200 mt-6 rounded p-2 px-6 absolute bottom-5 left-5">
        Github
      </a>
    </div>
  );
};

export default PresentationCard;
