// DynamicIsland.tsx
import Logo from '@/assets/favicon.svg';
import { Link } from 'react-router-dom';

interface DynamicIslandProps {
  isMouseNearDynamicIsland: boolean;
}

const DynamicIsland: React.FC<DynamicIslandProps> = ({
  isMouseNearDynamicIsland,
}) => {
  return (
    <nav
      id="dynamic-island"
      className="menu-container grid place-items-center group"
      style={{ zIndex: 9999999 }}>
      <div
        className={`flex flex-row items-center select-none fixed top-0 backdrop-blur-md border-gray-700/50 border rounded-full py-1 px-2 mt-3 text-white w-40 duration-300 ease-in-out ${
          isMouseNearDynamicIsland ? 'justify-between w-96' : ''
        }`}>
        <Link to="/" className="ml-1 pr-1 flex flex-row items-center">
          <img src={Logo} alt="" className="w-8 p-1" />
          OpenLayouts
        </Link>

        <div
          className={`duration-200 ease-in-out opacity-0 flex flex-row gap-2 pr-2 ${
            isMouseNearDynamicIsland
              ? 'opacity-100 duration-500'
              : ''
          }`}>
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <a href="https://docs.openlayout.me" target="_blank">
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DynamicIsland;
