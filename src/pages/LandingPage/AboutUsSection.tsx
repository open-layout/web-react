import Title from '@/components/Title';
import Vue from '@/assets/vue.png';
import React from '@/assets/react.png';
import Tailwind from '@/assets/tailwind.png';

const AboutUsContent = [
  {
    img: Vue,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste amet blanditiis quos! Rem sapiente voluptates iusto? Laboriosam, eos perspiciatis temporibus rerum eveniet consectetur amet rem doloribus, eum quis ex sapiente!',
  },
  {
    img: React,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste amet blanditiis quos! Rem sapiente voluptates iusto? Laboriosam, eos perspiciatis temporibus rerum eveniet consectetur amet rem doloribus, eum quis ex sapiente!',
  },
  {
    img: Tailwind,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste amet blanditiis quos! Rem sapiente voluptates iusto? Laboriosam, eos perspiciatis temporibus rerum eveniet consectetur amet rem doloribus, eum quis ex sapiente!',
  },
];

const AboutUsSection = () => {
  return (
    <section className="flex flex-col items-center mt-20 md:mt-96 mb-10 text-white">
      <Title text="About Us" />
      <article className="flex flex-col items-center gap-10 md:flex-col md:items-start">
        {AboutUsContent.map((content, index) => (
          <div
            key={index}
            className={`flex flex-col  justify-center items-center gap-5 p-5 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}>
            <img src={content.img} className="w-60" />
            <p className="mt-5 md:mt-0 md:ml-5 w-full md:w-[30%] text-xl">
              {content.text}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default AboutUsSection;
