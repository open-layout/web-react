import React from 'react';
import PresentationCard from '@/components/ui/presentationCard';
import { FoundersProps } from './interfaces';

const FoundersSection: React.FC<FoundersProps> = ({ userData, darkMode }) => {
  console.log('userData:', userData); // Add this line to log userData
  return (
    <section className="grid place-items-center mt-24">
      <h2 className={`text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>
        Founders
      </h2>
      <div className="flex flex-row flex-wrap justify-around gap-10 my-16">
        {userData.map((user) => (
          <PresentationCard
            key={user.username}
            name={user.username}
            description={user.bio}
            image={user.avatar}
            date={user.created_at.split('-')[0]}
            link={`https://github.com/${user.username}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FoundersSection;
