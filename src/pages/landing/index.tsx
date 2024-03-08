// LandingPage.tsx
import { useEffect, useState } from 'react';

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
  const [showArrow, setShowArrow] = useState(true);

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
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    const element = document.querySelector('html');

    if (!element)
        return;

    if (darkMode) 
        element.classList.add('dark');
    else 
        element.classList.remove('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 0 ? false : true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth',
    });
  };

  return (
    <Layout className={'snap-y'}>
      <a
        className="absolute top-0 left-10 mt-8 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-12" />
      </a>

      <WelcomeSection /> {/* has snap-center */}

      <div className="lg:pt-32 pt-20 flex flex-row gap-5 justify-center">
        <a
          className="px-8 py-3 dark:bg-white dark:text-black bg-black text-white rounded-full shadow-inner-xl font-semibold"
          href="https://docs.openlayout.me">
          Get Started
        </a>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <div className={`flex justify-center fixed bottom-12 w-full transition ${!showArrow && 'translate-y-24'}`}>
        <button onClick={scrollToContent} className="focus:outline-none">
          <ArrowDownIcon />
        </button>
      </div>

      <div style={{paddingTop: 64 + (window.innerWidth - 1920) }} />{/* dummy div to push the rest of the page down */}

      <AboutUsSection />  {/* has snap-center */}
      {userData.length > 0 && (
        <DevelopersSection userData={userData} />  /* has snap-center */
      )}
    </Layout>
  );
}

export default LandingPage;
