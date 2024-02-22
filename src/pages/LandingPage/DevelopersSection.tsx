import React from 'react';
import PresentationCard from '@/components/ui/presentationCard';
import { DevelopersProps } from './interfaces';

const DevelopersSection: React.FC<DevelopersProps> = ({
  userData,
  darkMode,
}) => {
  console.log('userData:', userData); // Add this line to log userData
  return (
    <section className="grid place-items-center mt-24">
      <h2 className={`text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>
        Developers
      </h2>
      <div className="flex flex-row flex-wrap justify-around gap-10 my-16">
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