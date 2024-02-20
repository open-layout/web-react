import github from '@icons/github.svg';
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

        <div className='flex h-screen'>
            {/* Left Block */}
            <div className='hidden md:flex w-2/3 md:w-0 flex-col justify-center items-center'>
                <h1 className="text-4xl font-bold text-center pt-20 text-white">Welcome to OpenLayout</h1>
            </div>
            
            {/* Login Block */}
            <div className='w-2/3 md:w-full backdrop-brightness-50 backdrop-blur-3xl border border-gray-700 rounded-lg m-2'>
                <h1 className='flex text-white'>Login</h1>
                
                  <button className={`flex px-6 py-4 text-white rounded-xl border-2 transition duration-1000 ${authUrl ? 'group bg-green-500 border-green-400' : 'bg-gray-600 border-gray-500 cursor-not-allowed'} items-center font-bold group-hover:border-4`}>
                      <img src={github} alt="GitHub Logo" className='flex w-8 mr-2 group-hover:translate-x-52 rotate-full group-hover:rotate-full transition duration-300' />
                      <span className='group-hover:-translate-x-10 transition duration-300'>Authenticate With GitHub</span>
                  </button>
            </div>
        </div>
    </main>
  );
}

export default AuthPage;
