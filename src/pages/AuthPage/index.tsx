import github from '@icons/github.svg';
import DynamicIsland from "@/components/ui/dynamicIsland";
import { useState } from 'react';

function AuthPage() {
  const [authUrl, setAuthUrl] = useState('');

  const get_auth_url = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/geturl');
      const { url } = await response.json(); // Access the 'url' property from the data object

      setAuthUrl(url);
    } catch (error) {
      console.error('[API] ', error);
      return false;
    }
  }

  useState(async () => {
    await get_auth_url();
  });

  return (
    <main>
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <DynamicIsland />

        <div className='flex h-screen'>
            {/* Left Block */}
            <div className='hidden md:flex w-0 md:w-2/3 flex-col justify-center items-center'>
                <h1 className="text-4xl font-bold text-center pt-20 text-white">Welcome to OpenLayout</h1>
            </div>
            
            {/* Login Block */}
            <div className={(authUrl && 'group ') + ' flex justify-center items-center w-full md:w-1/3 backdrop-brightness-50 backdrop-blur-3xl border border-gray-700 rounded-lg m-2'}>
              <div className="flex flex-col items-center text-center">
                <h1 className='text-white text-7xl font-bold mb-8'>Login</h1>
                <p className='text-gray-500 mb-16'>Click the button below to log in with your GitHub account.</p>
                
                <button className={`flex px-6 mx-2 py-4 text-white rounded-xl border-2 transition-all duration-1000 ${authUrl ? 'bg-green-500 border-green-400' : 'bg-gray-600 border-gray-500 cursor-not-allowed'} items-center font-bold hover:scale-105`}>
                  <img src={github} alt="GitHub Logo" className='flex w-8 mr-2 group-hover:translate-x-44 rotate-full group-hover:rotate-full transition duration-300' />
                  <span className='group-hover:-translate-x-3 transition duration-300'>Authenticate With <span className='group-hover:invisible'>GitHub</span></span>
                </button>

                <span className='mt-2 text-gray-500 text-sm'>I don want to log-in, <a href="#" className='text-indigo-600 font-bold'>go back</a></span>
              </div>
          </div>
        </div>
    </main>
  );
}

export default AuthPage;
