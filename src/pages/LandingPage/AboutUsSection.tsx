import Vue from '@/assets/npm.png';
import React from '@/assets/web.png';
import Tailwind from '@/assets/templates.png';
import { AboutUsProps } from './interfaces';

const AboutUsContent = [
  {
    img: Vue,
    text: "With this amazing npm package, you'll be able to unleash your creativity and effortlessly customize these templates with just one command! It's an exhilarating opportunity to elevate your projects to new heights!",
  },
  {
    img: React,
    text: "In this amazing web platform, you'll be able to manage your published websites and upload the templates you love the most! Imagine the endless possibilities to customize and bring your online projects to life!",
  },
  {
    img: Tailwind,
    text: "Embark on a journey through endless possibilities! Explore an unimaginable number of templates, crafted by a passionate community just like you. Find the perfect template that resonates with your vision and unleash your full creative potential!",
  },
];

const AboutUsSection: React.FC<AboutUsProps> = ({ darkMode }) => {
  return (
    <section className="flex flex-col items-center mt-20 md:mt-96 mb-10">
      <h2 className={`text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>
        About Us
      </h2>

      <article className="flex flex-col items-center gap-2  md:flex-col md:items-start">
        {AboutUsContent.map((content, index) => (
          <div
            key={index}
            className={`flex flex-col  justify-center items-center gap-5 p-5 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}>
            <img src={content.img} className="w-60" />
            <p
              className={`mt-5 md:mt-0 md:ml-5 w-full md:w-[30%] text-xl ${
                darkMode ? 'text-white' : 'text-gray-600'
              }`}>
              {content.text}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default AboutUsSection;
