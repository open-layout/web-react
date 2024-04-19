import React from 'react';

import { DevelopersProps } from './interfaces';

import PresentationCard from '@/components/ui/DevelopersCard';

const DevelopersSection: React.FC<DevelopersProps> = ({
  userData,
}) => {
  // console.log('userData:', userData); // Add this line to log userData
  return (
    <section className="grid place-items-center mt-24 snap-center">
      <h2 className={`text-3xl text-black dark:text-white font-bold`}>
        Developers
      </h2>
      <div className="flex flex-row flex-wrap justify-around gap-10 my-16 mx-10">
        {userData.map((user) => (
          <PresentationCard
            key={user.username}
            name={user.username}
            description={user.bio}
            image={user.avatar}
            date={user.created_at.split('-')[0]}
            badges={user.badges}
            link={`https://github.com/${user.username}`}
          />
        ))}
      </div>
    </section>
  );
};

export default DevelopersSection;
