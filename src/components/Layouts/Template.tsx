// TemplatePage.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import DynamicIsland from '@/components/ui/dynamicIsland';

interface TemplatePageProps {
  children: ReactNode;
  darkMode?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  children,
  darkMode = true,
}) => {
  const [isMouseNearDynamicIsland, setIsMouseNearDynamicIsland] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const distanceFromEdge = 200;
      const edgeBuffer = 10; // Margen de error para evitar falsos positivos en el borde

      const { clientX, clientY } = event;

      // Comprobar la posición del ratón en relación con el borde del navegador
      if (
        clientX <= distanceFromEdge + edgeBuffer ||
        clientX >= window.innerWidth - (distanceFromEdge + edgeBuffer) ||
        clientY <= distanceFromEdge + edgeBuffer ||
        clientY >= window.innerHeight - (distanceFromEdge + edgeBuffer)
      ) {
        setIsMouseNearDynamicIsland(true);
      } else {
        setIsMouseNearDynamicIsland(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
      {darkMode ? (
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      ) : (
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] "></div>
      )}
      <DynamicIsland isMouseNearDynamicIsland={isMouseNearDynamicIsland} />
      <main>{children}</main>
    </div>
  );
};

export default TemplatePage;
