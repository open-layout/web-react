import CopyButton from '@/components/ui/CopyButton';
import config from '@/config';

const WelcomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen snap-center">
      <div>
        <h1 className="text-4xl mb-8 text-center justify-center items-center font-poppins sm:text-6xl lg:flex-row flex flex-col">
          Welcome to&nbsp;
          <span className="text-title font-bold">Open Layouts</span>
        </h1>
      </div>
      <p className="text-gray-400 font-raleway pl-5 w-[80%] text-center text-md xl:w-[50%] sm:pl-14 sm:text-xl">
        An incredible platform for discovering the perfect{' '}
        <strong className="text-title/80">open-source</strong> layout for your
        personal website, offering a wide array of professional and high-quality
        designs supported by the community.
      </p>

      <div className="lg:pt-32 pt-20 flex flex-row gap-5 justify-center">
        <a
          className="px-8 py-3 dark:bg-white dark:text-black bg-black text-white rounded-full shadow-inner-xl font-semibold"
          target='_blank'
          href="https://docs.openlayout.me">
          Get Started
        </a>
        <CopyButton npmCommand={config.npm_command} />
      </div>
    </section>
  );
};

export default WelcomeSection;