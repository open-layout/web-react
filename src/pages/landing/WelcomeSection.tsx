const WelcomeSection = () => {
  return (
    <section className="grid place-items-center xl:mt-60 mt-32 snap-center">
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
    </section>
  );
};

export default WelcomeSection;