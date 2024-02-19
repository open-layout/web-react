import React from 'react';
import PresentationCard from "@/components/ui/presentationCard";

interface UserData {
  login: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  html_url: string;
}

interface Props {
  userData: UserData[];
}

const AboutUsSection: React.FC<Props> = ({ userData }) => {
  return (
    <section className="grid place-items-center mt-96">
      <h2 className="text-3xl text-white">About Us</h2>
      <div className="flex flex-row justify-around gap-10 my-16">
        {userData.map(user => (
          <PresentationCard 
            key={user.login}
            name={user.login}
            description={user.bio}
            image={user.avatar_url}
            date={user.created_at.split('-')[0]}
            link={user.html_url}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;
