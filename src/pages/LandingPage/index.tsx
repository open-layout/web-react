// LandingPage.tsx
import CopyButton from '@/components/ui/CopyButton';
import WelcomeSection from './WelcomeSection';
import DevelopersSection from './DevelopersSection';
import AboutUsSection from './AboutUsSection';
import Layout from '@/components/Layouts/Template';
import IconSun from '@icons/sun.svg';
import IconMoon from '@icons/moon.svg';
import ArrowDownIcon from './ArrowDownIcon';
import { useState } from 'react';

import { UserData } from './interfaces';
import { Link } from 'react-router-dom';
import config from '@/config';
import LoginButton from '@/components/ui/LoginButton';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [darkMode, setDarkMode] = useState(true); // Modo oscuro activado por defecto

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
  };

  return (
    <Layout darkMode={darkMode}>
      <a
        className="absolute top-0 left-10 mt-8 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-12" />
      </a>

      <LoginButton />
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

      <DevelopersSection userData={userData} darkMode={darkMode} />
    </Layout>
  );
}

export default LandingPage;
