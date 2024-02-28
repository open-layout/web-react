// LandingPage.tsx
import { useState } from 'react';

import { UserData } from './interfaces';

import config from '@/config';

import Layout from '@/components/layouts/Template';

import WelcomeSection from './WelcomeSection';
import CopyButton from '@/components/ui/CopyButton';
import AboutUsSection from './AboutUsSection';
import DevelopersSection from './DevelopersSection';

import IconSun from '@icons/sun.svg';
import IconMoon from '@icons/moon.svg';
import ArrowDownIcon from './ArrowDownIcon';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  const npmCommand = 'npx open-layout';

  useState(() => {
    const fetchData = async () => {
      try {
        fetch(`${config.api.baseurl}/developers`)
          .then((data) => data.json())
          .then((response) => setUserData(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    const element = document.querySelector('html');

    if (!darkMode) {
      element?.classList.add('dark');
    } else {
      element?.classList.remove('dark');
    }
  };

  return (
    <Layout>
      <a
        className="absolute top-0 left-10 mt-8 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-12" />
      </a>

      <WelcomeSection />

      <div className="lg:pt-32 pt-20 flex flex-row gap-5 justify-center">
        <a
          className="px-8 py-3 dark:bg-white dark:text-black bg-black text-white rounded-full shadow-inner-xl font-semibold"
          href="https://docs.openlayout.me">
          Get Started
        </a>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <div className="flex justify-center mt-16">
        <ArrowDownIcon darkMode={darkMode} />
      </div>

      <AboutUsSection />
      {userData.length > 0 && (
        <DevelopersSection userData={userData} darkMode={darkMode} />
      )}
    </Layout>
  );
}

export default LandingPage;
