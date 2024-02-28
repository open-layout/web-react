// DynamicIsland.tsx
import { Link } from 'react-router-dom';

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useIsAuthenticated';

import config from '@/config';

import favicon from '@/assets/favicon.svg';
import IconLogout from '@icons/logout.svg';
import Logo from '@/assets/favicon.svg';

const DynamicIsland = ({
  isMouseNearDynamicIsland,
}: {
  isMouseNearDynamicIsland: boolean;
}) => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

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
        className={`flex flex-row items-center justify-cemter select-none fixed z-50 top-0 backdrop-blur-md border-gray-700/50 border rounded-full py-1 px-2 mt-3 w-40 duration-300 ease-in-out ${
          isMouseNearDynamicIsland ? 'justify-between w-96' : ''
        }`}>
        {isAuthenticated() ? (
          <div className="flex flex-row gap-2 items-center">
            {isMouseNearDynamicIsland ? (
              <a onClick={handleLogout} className="w-7 my-1 cursor-pointer">
                <img
                  src={IconLogout}
                  alt=""
                  className="w-7 my-1 rounded-full"
                />
              </a>
            ) : (
              <img
                src={getUser()?.avatar || Logo}
                alt=""
                className={`w-7 my-1 ${
                  getUser() ? 'border-2 border-green-400' : ''
                }  rounded-full`}
              />
            )}
            <Link to="/dashboard" className="flex flex-row gap-2 items-center">
              {getUser()?.username || config.name}
            </Link>
          </div>
        ) : (
          <Link to="/auth" className="ml-1 flex flex-row items-center">
            <img src={favicon} alt="" className="w-8 p-1" />
            {isMouseNearDynamicIsland ? 'Login' : 'OpenLayouts'}
          </Link>
        )}

        <div
          className={`duration-200 ease-in-out opacity-0 flex flex-row gap-2 pr-2 ${
            isMouseNearDynamicIsland ? 'opacity-100 duration-500' : ''
          }`}>
          <Link to="/">Home</Link>
          <Link to="/layouts">Layouts</Link>
          <a href="https://docs.openlayout.me" target="_blank">
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DynamicIsland;
