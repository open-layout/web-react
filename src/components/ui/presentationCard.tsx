import React, { useState, useEffect } from 'react';
import { PresentationCardProps } from '@/pages/LandingPage/interfaces';

const PresentationCard: React.FC<PresentationCardProps> = ({
  name,
  description,
  image,
  link,
  date,
  badges,
}) => {
  const [badgeUrls, setBadgeUrls] = useState<string[]>([]);

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
    <article className="group text-white backdrop-blur-md border border-title px-2 py-4 rounded-xl w-72 h-72 relative flex flex-col justify-end gap-4 hover:shadow-lg hover:shadow-title transition-shadow duration-300">
      <img
        className="w-20 rounded-[50px] absolute -top-3 -left-3 border border-title shadow-2xl group-hover:rounded-3xl transition-all group-hover:shadow-lg group-hover:shadow-title"
        src={image}
        alt={`${name}'s pfp`}
      />
      <div className="self-end flex flex-col">
        <div className='flex flex-row self-end bg-gray-700 p-1 mt-1 rounded-sm'>
          {badgeUrls.map((url, index) => (
            <img key={badges[index].id} src={url} alt={badges[index].id} className='w-5 mb-1'/>
          ))}
        </div>
        <p className="text-xs text-gray-600">Since {date.split('-')[0]}</p>
      </div>
      <div className="p-2 flex flex-col bg-title/80 rounded-md min-h-48">
        <h2 className="text-xl pl-3">{name}</h2>
        <hr className="m-1" />
        <p className="text-gray-400 text-sm pl-3">{description}</p>
      </div>
      <a href={link} target="_blank" className=""></a>
    </article>
  );
};

export default PresentationCard;
