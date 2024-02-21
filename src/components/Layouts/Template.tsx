// TemplatePage.tsx
import React, { ReactNode, useState } from 'react';
import DynamicIsland from '@/components/ui/dynamicIsland';

interface TemplatePageProps {
  children: ReactNode;
  darkMode?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  children,
  darkMode = true,
}) => {
  const [isMouseNearDynamicIsland, setIsMouseNearDynamicIsland] =
    useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const dynamicIslandRect = document
      .getElementById('dynamic-island')
      ?.getBoundingClientRect();

    if (dynamicIslandRect) {
      const dynamicIslandCenterX =
        dynamicIslandRect.left + dynamicIslandRect.width / 2;
      const dynamicIslandCenterY =
        dynamicIslandRect.top + dynamicIslandRect.height / 2;

      const distance = Math.sqrt(
        (clientX - dynamicIslandCenterX) ** 2 +
          (clientY - dynamicIslandCenterY) ** 2
      );

      if (distance <= 200) {
        setIsMouseNearDynamicIsland(true);
      } else {
        setIsMouseNearDynamicIsland(false);
      }
    }
  };

  return (
    <div
      className={`${darkMode ? 'text-white' : 'text-black'}`}
      onMouseMove={handleMouseMove}>
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
