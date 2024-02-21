// LandingPage.tsx
import CopyButton from '@/components/ui/CopyButton';
import WelcomeSection from './WelcomeSection';
import FounderSection from './FounderSection';
import AboutUsSection from './AboutUsSection';
import favicon from '@/assets/favicon.svg';
import faviconyellow from '@/assets/faviconyellow.svg';
import faviconblue from '@/assets/faviconblue.svg';
import favicongreen from '@/assets/favicongreen.svg';
import IconSun from '@icons/sun.svg';
import IconMoon from '@icons/moon.svg';
import ArrowDownIcon from './ArrowDownIcon';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react';
import { UserData } from './interfaces';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [darkMode, setDarkMode] = useState(true); // Modo oscuro activado por defecto
  const [randomIndex, setRandomIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

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

  const images = [
    favicon,
    faviconyellow,
    faviconblue,
    favicongreen,
  ];
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

  useEffect(() => {
    getRandomIndex();
  }, []);


  // Función para generar un índice aleatorio y actualizar el estado
  const getRandomIndex = () => {
    const newIndex = Math.floor(Math.random() * images.length);
    setRandomIndex(newIndex);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={darkMode ? 'text-white' : 'text-black'}>
      {darkMode ? (
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      ) : (
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] "></div>
      )}

      <a
        className="fixed top-0 left-10 mt-8 px-3 py-1 rounded-full "
        onClick={toggleDarkMode}>
        <img src={darkMode ? IconSun : IconMoon} alt="" className="w-12" />
      </a>


      {isAuthenticated() ? (

        <div>
          <div
            className='border-2 backdrop-blur-md border-gray-700/50 rounded-xl fixed top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col items-center group hover:w-40 hover:h-48 duration-500 ease-in-out'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/auth" className="rounded-full cursor-pointer block ">
              <img src={images[randomIndex]} alt="" className='w-10 mb-3' />
            </Link>
            {showDropdown && (
              <div className="flex flex-col opacity-100  transition-opacity w-40 h-48 items-center justify-center text-xl rounded-xl">
                <hr className="border-t border-gray-700/50 w-32 " />
                <Link to="/dashboard" className="text-white hover:text-gray-300 mt-3">Dashboard</Link>
                <hr className="border-t border-gray-700/50 w-32 mt-3" />
                <Link to="/" className="text-red-500 font-bold hover:text-red-700 mt-3">Log Out</Link>
              </div>
            )}
          </div>

        </div>
      ) : (<div>
        <div
          className='border-2 backdrop-blur-md border-gray-700/50 rounded-xl fixed top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col justify-center items-center'
        >
          <Link to="/auth" className="rounded-full cursor-pointer block ">
            <img src={images[randomIndex]} alt="" className='w-10 grayscale' />
          </Link>
        </div>
      </div>)}
      <WelcomeSection />

      <div className="lg:pt-32 pt-20 flex flex-row gap-5 justify-center">
        <Link
          className={`px-8 py-3 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'
            } rounded-full shadow-inner-xl font-semibold`}
          to="/dashboard"
        >
          Get Started
        </Link>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <div className="flex justify-center mt-16">
        <ArrowDownIcon darkMode={darkMode} />
      </div>

      <AboutUsSection darkMode={darkMode} />

      <FounderSection userData={userData} darkMode={darkMode} />
    </main>
  );
}

export default LandingPage;
