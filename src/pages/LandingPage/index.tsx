import CopyButton from '@/components/ui/CopyButton'
import WelcomeSection from './WelcomeSection';
import AboutUsSection from './FounderSection';
import useUserData from './useUserData';

function LandingPage() {
  const npmCommand = "npx open-layout";
  const userData = useUserData();
  

  return (
    <main>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <WelcomeSection />
      <div className="pt-32 flex flex-row gap-5 justify-center">
        <a
          className="px-8 py-3 bg-white rounded-full shadow-inner-xl font-semibold"
          href="https://docs.openlayout.me/"
          target="_blank"
        >
          Get Started
        </a>
        <CopyButton npmCommand={npmCommand} />
      </div>

      <AboutUsSection userData={userData} />
    </main>
  );
}

export default LandingPage;
