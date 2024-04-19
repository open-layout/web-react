import ImageNpm from '@/assets/npm.png';
import ImageWeb from '@/assets/web.png';
import ImageTemplates from '@/assets/templates.png';

const AboutUsContent = [
  {
    img: ImageNpm,
    text: "With this amazing npm package, you'll be able to unleash your creativity and effortlessly customize these templates with just one command! It's an exhilarating opportunity to elevate your projects to new heights!",
  },
  {
    img: ImageWeb,
    text: "In this amazing web platform, you'll be able to manage your published websites and upload the templates you love the most! Imagine the endless possibilities to customize and bring your online projects to life!",
  },
  {
    img: ImageTemplates,
    text: 'Embark on a journey through endless possibilities! Explore an unimaginable number of templates, crafted by a passionate community just like you. Find the perfect template that resonates with your vision and unleash your full creative potential!',
  },
];

const AboutUsSection = () => {
  return (
    <section className="flex flex-col items-center mb-10 snap-center">
      <h2 className="text-3xl text-black font-semibold dark:text-white mb-4">About Us</h2>

      <article className="flex flex-col items-center gap-5 lg:flex-col snap-y">
        {AboutUsContent.map((content, index) => (
          <div
            key={index}
            className={`flex flex-col snap-center group justify-center items-center gap-5 p-5 rounded-3xl transition duration-300 hover:backdrop-blur-xl hover:drop-shadow-lg hover:bg-slate-800/20 hover:shadow-lg border-2 border-white/0 hover:border-slate-700/30 mx-20 ${
              index % 2 == 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}>
            <img src={content.img} className={`w-60 transition duration-700 group-hover:scale-105 ${index % 2 == 0 ? 'group-hover:-translate-x-4' : 'group-hover:translate-x-4'}`} />
            <p className={`mt-5 p-5 lg:mt-0 lg:ml-5 w-full lg:w-[50%] text-xl dark:text-gray-400 text-gray-600 transition duration-700 group-hover:scale-105 ${index % 2 !== 0 ? 'lg:group-hover:-translate-x-4' : 'lg:group-hover:translate-x-4'}`}>
              {content.text}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default AboutUsSection;
