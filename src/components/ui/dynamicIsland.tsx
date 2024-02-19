import Logo from "@/assets/favicon.svg";

const DynamicIsland = () => {
  return (
    <nav className="menu-container grid place-items-center text-white/75" style={{ zIndex: 999 }}>
      <div className="fixed top-0 backdrop-blur-md border-gray-700/50 border rounded-full py-1 px-2 mt-3">
        <div className="flex items-center">
          <img src={Logo} alt="" className="w-8 p-1" />
          <a href="#" className="ml-1">OpenLayouts</a>
        </div>
      </div>
    </nav>
  );
};

export default DynamicIsland;
