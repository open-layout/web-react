// TemplatePage.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import DynamicIsland from '@/components/ui/dynamicIsland';
import CustomScrollbar from '@/components/Layouts/Scrollbar';

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const distanceFromEdge = 200;
      const edgeBuffer = 10;

      const { clientY } = event;

      // Check mouse position only relative to the top edge of the browser window
      setIsMouseNearDynamicIsland(clientY <= distanceFromEdge + edgeBuffer);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () =>
      setIsMouseNearDynamicIsland(false)
    );
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
      <CustomScrollbar>{children}</CustomScrollbar>
    </div>
  );
};

export default TemplatePage;
