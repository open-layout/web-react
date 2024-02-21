// LandingPage.tsx
import CopyButton from '@/components/ui/CopyButton';
import WelcomeSection from './WelcomeSection';
import FounderSection from './FounderSection';
import AboutUsSection from './AboutUsSection';
import Layout from '@/components/Layouts/Template';
import LoginIcon from '@/assets/login.png';
import IconSun from '@icons/sun.svg';
import IconMoon from '@icons/moon.svg';
import ArrowDownIcon from './ArrowDownIcon';
import { useState } from 'react';
import { UserData } from './interfaces';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  const npmCommand = 'npx open-layout';

  const response = [
    {
      username: 'IMXNOOBX',
      avatar: 'https://avatars.githubusercontent.com/u/69653071?v=4',
      bio:
        '• hey hi! hope you have a great day! •ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ  \r\n' +
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Layout darkMode={darkMode}>
      <a
        className="fixed top-0 right-5 mt-3 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-16" />
      </a>
      <Link
        to="/auth"
        className="fixed top-0 right-32 mt-4 rounded-full cursor-pointer">
        <img src={LoginIcon} alt="" className="w-16" />
      </Link>
      <WelcomeSection />

      <div className="lg:pt-32 pt-20 flex flex-row gap-5 justify-center">
        <Link
          className={`px-8 py-3 ${
            darkMode ? 'bg-white text-black' : 'bg-black text-white'
          } rounded-full shadow-inner-xl font-semibold`}
          to="/dashboard">
          Get Started
        </Link>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <div className="flex justify-center mt-16">
        <ArrowDownIcon darkMode={darkMode} />
      </div>

      <AboutUsSection darkMode={darkMode} />

      <FounderSection userData={userData} darkMode={darkMode} />
    </Layout>
  );
}

export default LandingPage;
