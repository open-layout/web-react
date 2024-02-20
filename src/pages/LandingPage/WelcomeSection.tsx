import React from "react";
import DynamicIsland from "@ui/dynamicIsland";

const WelcomeSection: React.FC = () => {
  return (
    <section className="grid place-items-center mt-60">
      <DynamicIsland />
      <div>
        <h1 className="text-white text-6xl mb-8 text-center justify-center items-center font-poppins sm:text-2xl">
          Welcome to <span className="text-title font-bold">Open Layouts</span>
        </h1>
      </div>
      <p className="text-gray-400 font-raleway pl-14 text-xl w-[50%] sm:pl-6 sm:text-md">
        An incredible platform for discovering the perfect{" "}
        <strong className="text-title/80">open-source</strong> layout for your
        personal website, offering a wide array of professional and high-quality
        designs supported by the community.
      </p>
    </section>
  );
};

export default WelcomeSection;
