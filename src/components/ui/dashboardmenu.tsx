

const DashboardMenu = () => {
  return (
    <nav
      className="menu-container grid place-items-center "
      style={{ zIndex: 999 }}>
      <div className="fixed left-10 top-60 bg-gray-700/40 border-gray-700/50 border rounded-md  py-1 px-2 mt-3">
        <div className="flex flex-col items-center select-none text-white gap-5 p-4">
        
          <div className='flex flex-row'>
            <a href="#" className="ml-1 pr-1">
            Search: 
          </a>
          <input className='rounded-full w-36' /></div>
          
          <a href="#" className="ml-1 pr-1">
            Filter
          </a>
          <a href="#" className="ml-1 pr-1">
            Order
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DashboardMenu;