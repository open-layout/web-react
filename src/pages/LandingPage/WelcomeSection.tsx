import React from 'react';
import DynamicIsland from '@/components/ui/dynamicIsland';

const WelcomeSection: React.FC = () => {
  return (
    <section className="grid place-items-center lg:mt-60 mt-32">
      <DynamicIsland />
      <div>
        <h1 className="text-4xl mb-8 text-center justify-center items-center font-poppins sm:text-6xl lg:flex-row flex flex-col">
          Welcome to&nbsp;
          <span className="text-title font-bold">Open Layouts</span>
        </h1>
      </div>
      <p className="text-gray-400 font-raleway pl-5 w-[80%] lg:text-left text-balance text-md lg:w-[50%] sm:pl-14 sm:text-xl">
        An incredible platform for discovering the perfect{' '}
        <strong className="text-title/80">open-source</strong> layout for your
        personal website, offering a wide array of professional and high-quality
        designs supported by the community.
      </p>
    </section>
  );
};

export default WelcomeSection;
