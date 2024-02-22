import { useState } from 'react';

const Switch = () => {
  const [uploaded, setUploaded] = useState(true);

  const handleToggle = () => {
    setUploaded(!uploaded);
  };

  return (
    <label className="flex items-center justify-center w-72">
      {/* <span className="mr-2">Uploaded</span> */}
      <div className="relative flex items-center cursor-pointer">
        <input type="checkbox" className="hidden" onChange={handleToggle} checked={uploaded} />
        <div className={`w-52 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${uploaded ? 'bg-title' : 'bg-gray-400'}`}></div>
        <div className={`absolute inset-y-0 left-0 w-28 h-6 bg-white rounded-full shadow-md flex justify-center items-center transition-transform duration-300 transform ${uploaded ? 'translate-x-24' : 'translate-x-0'}`}>
          <span className='text-title select-none'>{uploaded ? 'Uploaded' : 'Unuploaded'}</span>
        </div>
      </div>
    </label>
  );
};

export default Switch;
