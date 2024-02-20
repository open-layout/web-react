import github from '@icons/github.svg';
import logo from "@/assets/favicon.svg";
import config from "@/config";

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import DynamicIsland from "@/components/ui/dynamicIsland";
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function AuthPage() {
  const signIn = useSignIn();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [authProgress, setAuthProgress] = useState(0); // -1 - 3
  const [authPhase, setAuthPhase] = useState('Requesting Access Token...');
  const [authUrl, setAuthUrl] = useState('');

  const get_auth_url = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/auth/geturl');
      const { url } = await response.json(); // Access the 'url' property from the data object

      setAuthUrl(url);
    } catch (error) {
      console.error('[API] ', error);
      return false;
    }
  }

  const get_auth_token = async (oath: string) => {
    try {
      const response = await fetch(config.api.baseurl + '/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: oath })
      });

      return await response.json(); // Access the 'url' property from the data object
    } catch (error) {
      console.error('[API] ', error);
      return false;
    }
  }

  useState(async () => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      setIsAuth(true);

      setAuthProgress(1);
      const result = await get_auth_token(code);
      setAuthProgress(result.success ? 2 : -1);
      if (!result.success)
        return setAuthPhase(result.message || 'An error occurred while authenticating with GitHub. Please try again later');

      setAuthPhase('Received Auth Token...')

      const res = signIn({ auth: { token: result.token, type: 'Bearer' } });

      setAuthProgress(result.success ? 3 : -1);

      if (!res)
        return setAuthPhase('An error occurred while logging in in the client. Please try again later');
      
      setAuthPhase('Successfully logged in... Redirecting...')

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);
    }

    await get_auth_url();
  });

  return (
    <main>
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <DynamicIsland />

        <div className='flex h-screen'>
            {/* Left Block */}
            <div className='hidden lg:flex w-0 lg:w-2/3 flex-col justify-center items-center'>
                <h1 className="text-4xl font-bold text-center pt-20 text-white">Welcome to OpenLayout</h1>
            </div>
            
            {/* Login Block */}
            <div className={(authUrl && 'group ') + ' flex justify-center items-center w-full lg:w-1/3 bg-gray-800/50 backdrop-blur-3xl border border-gray-700 rounded-lg m-2 p-2'}>
              <div className="flex flex-col items-center text-center select-none">
                <img src={logo} alt="Ollogo" className='w-60' />
                <h1 className='text-white text-7xl font-bold mb-8'>Login</h1>
                <p className='text-gray-500 mb-8 mx-2'>{isAuth ? 'Authenticating... Please do not exist this page until we are finish' : 'Click the button below to log in with your GitHub account.'}</p>

                {!isAuth ? 
                (
                  <div>
                        <button onClick={() => window.location.href = authUrl } className={`flex px-6 mx-2 py-4 text-white rounded-xl border-2 transition-all duration-300 delay-75 ${authUrl ? 'bg-green-500 border-green-400 select-auto' : 'bg-gray-600 border-gray-500 cursor-not-allowed'} items-center font-bold hover:scale-105`}>
                          <img src={github} alt="GitHub Logo" className='flex w-8 mr-2 group-hover:translate-x-44 rotate-full group-hover:rotate-full transition duration-300' />
                          <span className='group-hover:-translate-x-3 transition duration-300'>Authenticate With <span className='transition-all duration-500 group-hover:opacity-0'>GitHub</span></span>
                        </button>
                        <div className='mt-2 text-gray-500 text-sm'>I don want to log-in, <span onClick={() => history.back() } className='text-indigo-600 font-extrabold hover:underline'>go back</span></div>
                  </div>
                ) : 
                (
                  <div className='bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 w-full'>
                    <h1 className={'text-2xl font-extrabold ' + (authProgress >= 0 ? 'text-green-500' : 'text-red-500')}>{authProgress >= 0 ? 'Authenticating...' : 'Error...'}</h1>
                    {/* Progress bar */}
                    <div className={'w-full bg-gray-700/50 border-2 rounded-lg my-2 ' + (authProgress >= 0 ? 'border-green-400' : 'border-red-400')}>
                        <div className={'w-'+ authProgress +'/3 rounded-lg h-3 ' + (authProgress >= 0 ? 'bg-green-500' : 'bg-red-500')}/>
                    </div>
                    <p className='text-gray-500 font-bold text-xs'>{authPhase || "You have successfully authenticated with GitHub."}</p>
                  </div>
                )}

              </div>
          </div>
        </div>
    </main>
  );
}

export default AuthPage;
