import { useEffect, useState } from 'react';

import Layout from '@/components/layouts/Template';

import Favicon from '@/assets/favicon.svg';

function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [blinkInterval, setBlinkInterval] = useState(1000); // Intervalo inicial de parpadeo de 1000ms (1 segundo)
  const [greyscale, setGreyscale] = useState(0); // Valor de greyscale inicial (0% de greyscale = morado original)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0.5) {
          clearInterval(interval);
          window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';
          return 0;
        } else {
          return prevTimeLeft - 1;
        }
      });

      // Ajustar el intervalo de parpadeo y el valor de greyscale según el tiempo restante
      if (timeLeft <= 0.5) {
        setBlinkInterval(500); // Cambiar el intervalo de parpadeo a 500ms (0.5 segundos)
        setGreyscale(100); // Cambiar el valor de greyscale a 100% (blanco)
      } else {
        setBlinkInterval((prevInterval) => prevInterval * 0.75); // Reducción del intervalo de parpadeo al 75% cada segundo
        setGreyscale((prevGreyscale) => prevGreyscale + 100 / 9.5); // Aumento progresivo del valor de greyscale para llegar a 100% en 9.5 segundos
      }
    }, 1000); // Ejecutar cada 1 segundo

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <article className="w-screen h-screen flex flex-col items-center justify-center gap-20">
        <h1 className="text-6xl text-title">Not Found</h1>
        <div className="flex flex-row text-[12rem] font-bold">
          <h1 className="text-title">4</h1>
          <img
            src={Favicon}
            alt="0"
            className="w-52 animate-blink"
            style={{
              animationDuration: `${blinkInterval}ms`,
              filter: `grayscale(${greyscale}%)`,
            }}
          />
          <h1 className="text-title">4</h1>
        </div>
        <p className="text-2xl font-bold">
          This page will be destroyed in&nbsp;
          <span className="text-title">
            00:
            {timeLeft < 10 ? '0' + timeLeft : timeLeft}
          </span>
        </p>
      </article>
    </Layout>
  );
}

export default LandingPage;
