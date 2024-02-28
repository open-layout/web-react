// DynamicIsland.tsx
import favicon from '@/assets/favicon.svg';
import { Link } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const DynamicIsland = ({
  isMouseNearDynamicIsland,
}: {
  isMouseNearDynamicIsland: boolean;
}) => {
  const isAuthenticated = useIsAuthenticated();

  const getUserFromLocalstorage = () => {
    try {
      return JSON.parse(localStorage.getItem('ol_user'));
    } catch (e) {
      return null;
    }
  };
  return (
    <nav
      id="dynamic-island"
      className="menu-container grid place-items-center group text-white">
      <div
        className={`flex flex-row items-center select-none fixed z-50 top-0 backdrop-blur-md border-gray-700/50 border rounded-full py-1 px-5 mt-3 w-40 duration-300 ease-in-out ${
          isMouseNearDynamicIsland ? 'justify-between w-96' : ''
        }`}>
        {isAuthenticated() ? (
          <Link to="/dashboard" className="ml-1 flex flex-row items-center">
            <img
              src={getUserFromLocalstorage()?.avatar}
              alt=""
              className="w-8 m-1 mr-2 border-2 border-green-400 rounded-full"
            />
            {getUserFromLocalstorage()?.username}
          </Link>
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
