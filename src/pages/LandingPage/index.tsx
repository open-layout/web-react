import { useState } from 'react';
import { UserData } from './interfaces';

import CopyButton from '@/components/ui/CopyButton'
import WelcomeSection from './WelcomeSection';
import AboutUsSection from './FounderSection';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const npmCommand = "npx open-layout";

  const response = [
    {
      username: 'IMXNOOBX',
      avatar: 'https://avatars.githubusercontent.com/u/69653071?v=4',
      bio: '• hey hi! hope you have a great day! •ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ  \r\n' +
        '•> Hiii im noob!ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ•> If you need help dm me <3',
      created_at: '2020-08-13T21:26:43Z',
    },
    {
      username: 'AzalDevX',
      avatar: 'https://avatars.githubusercontent.com/u/98758892?v=4',
      bio: 'Programming is the art of creating something out of nothing with just a couple of ideas. 🚀',
      created_at: '2022-01-31T15:11:06Z',
    },
    {
      username: 'AngleSad',
      avatar: 'https://avatars.githubusercontent.com/u/118389540?v=4',
      bio: 'Programming is the bridge between imagination and reality, where each line of code is a step towards the materialization of innovative ideas. 🪐',
      created_at: '2022-04-19T12:45:00Z',
    },
  ];

  useState(() => {
    const fetchData = async () => {
      try {
        // fetch()
        //   .then()
        setUserData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  });

  return (
    <main>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <WelcomeSection />
      <div className="pt-32 flex flex-row gap-5 justify-center">
        <a
          className="px-8 py-3 bg-white rounded-full shadow-inner-xl font-semibold"
          href="https://docs.openlayout.me/"
          target="_blank"
        >
          Get Started
        </a>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <AboutUsSection userData={userData} />
    </main>
  );
}

export default LandingPage;
