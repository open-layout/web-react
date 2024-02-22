// LandingPage.tsx
import CopyButton from '@/components/ui/CopyButton';
import WelcomeSection from './WelcomeSection';
import DevelopersSection from './DevelopersSection';
import AboutUsSection from './AboutUsSection';
import Layout from '@/components/Layouts/Template';
import favicon from '@/assets/favicon.svg';
import faviconyellow from '@/assets/faviconyellow.svg';
import faviconblue from '@/assets/faviconblue.svg';
import favicongreen from '@/assets/favicongreen.svg';
import IconSun from '@icons/sun.svg';
import IconMoon from '@icons/moon.svg';
import ArrowDownIcon from './ArrowDownIcon';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useEffect, useState } from 'react';
import { UserData } from './interfaces';
import { Link } from 'react-router-dom';
import config from '@/config';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [darkMode, setDarkMode] = useState(true); // Modo oscuro activado por defecto
  const [randomIndex, setRandomIndex] = useState(0);
  const [, setIsHovering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const handleMouseEnter = () => {
    setIsHovering(true);
    setTimeout(() => {
      setShowDropdown(true);
    }, 415); // Delay de 300 milisegundos
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowDropdown(false);
  };

  const images = [favicon, faviconyellow, faviconblue, favicongreen];
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

  useEffect(() => {
    getRandomIndex();
  });

  // Función para generar un índice aleatorio y actualizar el estado
  const getRandomIndex = () => {
    const newIndex = Math.floor(Math.random() * images.length);
    setRandomIndex(newIndex);
  };
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

      {isAuthenticated() ? (
        <div>
          <div
            className="border-2 backdrop-blur-md border-gray-700/50 rounded-xl absolute top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col items-center group hover:w-40 hover:h-48 duration-500 ease-in-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Link to="/auth" className="rounded-full cursor-pointer block ">
              <img src={images[randomIndex]} alt="" className="w-10 mb-3" />
            </Link>
            {showDropdown && (
              <div className="flex flex-col opacity-100  transition-opacity w-40 h-48 items-center justify-center text-xl rounded-xl">
                <hr className="border-t border-gray-700/50 w-32 " />
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-300 mt-3">
                  Dashboard
                </Link>
                <hr className="border-t border-gray-700/50 w-32 mt-3" />
                <Link
                  to="/"
                  className="text-red-500 font-bold hover:text-red-700 mt-3">
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="border-2 backdrop-blur-md border-gray-700/50 rounded-xl absolute top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col justify-center items-center">
            <Link to="/auth" className="rounded-full cursor-pointer block ">
              <img
                src={images[randomIndex]}
                alt=""
                className="w-10 grayscale"
              />
            </Link>
          </div>
        </div>
      )}
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
