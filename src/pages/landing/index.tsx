// LandingPage.tsx
import { useEffect, useState } from 'react';

import { UserData } from './interfaces';

import config from '@/config';

import Layout from '@/components/ui/Template';

import WelcomeSection from './WelcomeSection';
import AboutUsSection from './AboutUsSection';
import DevelopersSection from './DevelopersSection';
import Amethyst from './Amethyst';

import ArrowDownIcon from './ArrowDownIcon';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  // const [darkMode, setDarkMode] = useState(true);
  const [showArrow, setShowArrow] = useState(true);

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

  /*
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
  */

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
      {/* <a
        className="absolute top-0 left-10 mt-8 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-12" />
      </a> */}
      {/* <Amethyst /> Add a pool with the Amethysts so it doesnt consume too much memory */}

      <WelcomeSection /> {/* has snap-center */}

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
