import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

import config from '@/config';

import favicon from '@/assets/favicon.svg';
import IconLogout from '@icons/logout.svg';
import Logo from '@/assets/favicon.svg';

const DynamicIsland: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const [mouseNear, setMouseNear] = useState(false);
  const [logOutHover, setLogOutHover] = useState(false);
  // const [lastHoverTimeout, setLastHoverTimeout] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const distanceFromEdge = 300;

      const { clientY, clientX } = event;

      const is_hovering_y = clientY <= distanceFromEdge;
      const is_hovering_x =
        clientX >= window.innerWidth / 2 - distanceFromEdge * 2 && // We double the edges to make it a smoother transition
        clientX <= window.innerWidth / 2 + distanceFromEdge * 2;
      const is_hovering = is_hovering_y && is_hovering_x;

      setMouseNear(is_hovering);

      /**
       * TODO: Fix this shit
       
      if (!is_hovering)
        return


        // Ik its a bit crappy but it works and i need to make it quickly
        clearTimeout(lastHoverTimeout);

        const timeout = setTimeout(() => {
            setMouseNear(false);
        }, 1000);

        setLastHoverTimeout(timeout);
       */
    };

    document.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('mouseleave', () => setTimeout(() => handleMouseMove, 1000));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLogout = () => {
    signOut();


    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const getUser = () => {
    const user_data = localStorage.getItem('ol_user') as string;
    try {
      return JSON.parse(user_data);
    } catch (e) {
      return null;
    }
  };
  return (
    <nav
      id="dynamic-island"
      className="menu-container flex justify-center group dark:text-white text-black">
      <div
        // Animation done through vanilla css in index.css file
        className={`flex flex-row items-center select-none fixed z-50 top-0 h-10 backdrop-blur-md border-gray-700/50 border rounded-full py-1 px-2 mt-3 w-40 transition duration-300 ease-in-out ${mouseNear ? `justify-between increase-width` : 'delay-1000 decrease-width'
          }`}
        // onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        //   (e.target as HTMLDivElement).style.transitionDelay = '0s';
        //   console.log('enter', e.target);
        // }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          // (e.target as HTMLDivElement).style.transitionDelay = '1s';
          console.log('leave', e.target);
        }}
      >
        {isAuthenticated() ? (
          <div className="flex flex-row gap-2 items-center w-full">
            <img
              src={(logOutHover) ? IconLogout : getUser()?.avatar || Logo}
              onMouseEnter={() => setLogOutHover(true)}
              onMouseLeave={() => setLogOutHover(false)}
              onClick={logOutHover ? handleLogout : () => { }}
              alt=""
              className={`w-7 my-1 select-none transition duration-200 ${(getUser() && !logOutHover) ? 'border-2 border-green-400 animate-border-pulse' : 'rotate-full scale-125'
                } rounded-full`}
            />
            <Link to="/dashboard" className={`${!mouseNear && 'mx-auto'} truncate font-semibold transition duration-300 hover:scale-105 hover:translate-x-1 hover:text-white text-transparent bg-gradient-to-r from-violet-600 to-indigo-700 bg-clip-text animate-gradient-x select-none`}>
              {getUser()?.username || config.name}
            </Link>
          </div>
        ) : (
          <Link to="/auth" className="ml-1 flex flex-row items-center">
            <img src={favicon} alt="" className="w-8 p-1" />
            {mouseNear ? 'Login' : 'OpenLayouts'}
          </Link>
        )}

        <div
          className={`duration-200 ease-in-out opacity-0 flex flex-row gap-2 pr-2 ${mouseNear ? 'opacity-100' : 'w-0 -translate-x-10'
            }`}>
          <Link to="/" className='transition duration-300 text-gray-600 hover:text-white hover:scale-105 hover:-translate-y-1'>Home</Link>
          <Link to="/layouts" className='transition duration-300 text-gray-600 hover:text-white hover:scale-105 hover:-translate-y-1'>Layouts</Link>
          <a href="https://docs.openlayout.me" target="_blank" className='transition duration-300 text-gray-600 te hover:text-white hover:scale-105 hover:-translate-y-1'>Docs</a>
        </div>
      </div>
    </nav>
  );
};

export default DynamicIsland;
