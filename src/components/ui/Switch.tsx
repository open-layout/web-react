import { useState } from 'react';

const Switch = () => {
  const [uploaded, setUploaded] = useState(false);

  const handleToggle = () => {
    setUploaded(!uploaded);
  };

  return (
    <label className="flex items-center">
      <span className="mr-2">Uploaded</span>
      <div className="relative flex items-center cursor-pointer">
        <input type="checkbox" className="hidden" onChange={handleToggle} checked={uploaded} />
        <div className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${uploaded ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <div className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow-md flex justify-center items-center transition-transform duration-300 transform ${uploaded ? 'translate-x-full' : 'translate-x-0'}`}>
          <span className='text-white'>{uploaded ? 'Unuploaded' : 'Uploaded'}</span>
        </div>
      </div>
    </label>
  );
};

export default Switch;
