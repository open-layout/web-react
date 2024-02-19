import React, { useState, useEffect } from 'react';
import DynamicIsland from "@/components/ui/dynamicIsland";
import PresentationCard from "@/components/ui/presentationCard";
import IconCopy from "@/assets/icon-copy.svg";
import IconTick from "@/assets/icon-tick.svg";

interface UserData {
  login: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  html_url: string;
}

function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [userDataIMXNOOBX, setUserDataIMXNOOBX] = useState<UserData | null>(null);
  const [userDataAzalDevX, setUserDataAzalDevX] = useState<UserData | null>(null);
  const [userDataAngleSad, setUserDataAngleSad] = useState<UserData | null>(null);

  const npmCommand = "npx openlayout";

  useEffect(() => {
    fetchUserData('imxnoobx', setUserDataIMXNOOBX);
    fetchUserData('azaldevx', setUserDataAzalDevX);
    fetchUserData('anglesad', setUserDataAngleSad);
  }, []);

  const fetchUserData = (username: string, setData: (data: UserData) => void) => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then((data: UserData) => setData(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleClick = () => {
    navigator.clipboard.writeText(npmCommand)
      .then(() => {
        console.log('Text copied: ' + npmCommand);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  return (
    <main>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <section className="grid place-items-center mt-60">
        <DynamicIsland />
        <div>
          <h1 className="text-white text-6xl mb-8 text-center justify-center items-center font-poppins">
            Welcome to <span className="text-title font-bold">Open Layouts</span>
          </h1>
        </div>
        <p className="text-gray-400 font-raleway pl-14 text-xl w-[50%]">
          An incredible platform for discovering the perfect <strong className="text-title/80">open-source</strong> layout
          for your personal website, offering a wide array of professional and high-quality
          designs supported by the community.
        </p>
        <div className="pt-32 flex flex-row gap-5">
          <a
            className="px-8 py-3 bg-white rounded-full shadow-inner-xl font-semibold"
            href="https://docs.openlayout.me/"
            target="_blank"
          >
            Get Started
          </a>
          <div className="relative">
            <code className="bg-code text-white rounded-lg py-3 pl-5 pr-2 w-64 border border-title flex justify-between flex-row items-center">
              <p>
                <span className="text-gray-400">$</span> {npmCommand}<span className="animate-blink select-none">|</span>
              </p>
              {copied ? (
                <img
                  src={IconTick}
                  alt="Copied"
                  className="w-6"
                />
              ) : (
                <img
                  src={IconCopy}
                  alt="Copy"
                  className="w-6 transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer"
                  onClick={handleClick}
                />
              )}
            </code>
          </div>
        </div>
      </section>

      <section className="grid place-items-center mt-96">
        <h2 className="text-3xl text-white">About Us</h2>
        <div className="flex flex-row justify-around gap-10 my-16">
          {userDataIMXNOOBX && (
            <PresentationCard 
              name={userDataIMXNOOBX.login}
              description={userDataIMXNOOBX.bio}
              image={userDataIMXNOOBX.avatar_url}
              date={userDataIMXNOOBX.created_at.split('-')[0]}
              link={userDataIMXNOOBX.html_url}
            />
          )}
          {userDataAzalDevX && (
            <PresentationCard 
              name={userDataAzalDevX.login}
              description={userDataAzalDevX.bio}
              image={userDataAzalDevX.avatar_url}
              date={userDataAzalDevX.created_at.split('-')[0]}
              link={userDataAzalDevX.html_url}
            />
          )}
          {userDataAngleSad && (
            <PresentationCard 
              name={userDataAngleSad.login}
              description={userDataAngleSad.bio}
              image={userDataAngleSad.avatar_url}
              date={userDataAngleSad.created_at.split('-')[0]}
              link={userDataAngleSad.html_url}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default LandingPage;
