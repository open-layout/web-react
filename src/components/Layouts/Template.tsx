// TemplatePage.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import DynamicIsland from '@/components/ui/dynamicIsland';
// import CustomScrollbar from '@/components/Layouts/Scrollbar';

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
   const [isMouseInDefinedArea, setIsMouseInDefinedArea] = useState(false);


  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const distanceFromEdge = 200;

      const { clientY, clientX } = event;

      // Check mouse position only relative to the top edge of the browser window
      const is_hovering_y = clientY <= distanceFromEdge;
      const is_hovering_x = clientX >= window.innerWidth / 2 - distanceFromEdge && clientX <= window.innerWidth / 2 + distanceFromEdge;
      const is_hovering = is_hovering_y && is_hovering_x

      if (is_hovering)
      setIsMouseNearDynamicIsland(is_hovering);
      setIsMouseInDefinedArea(is_hovering);


      // Check if the mouse was previously within the defined area
    if (!is_hovering && !isMouseInDefinedArea) {
        // If the mouse enters the defined area, set a delay before closing the dynamic island
        setIsMouseInDefinedArea(true);
        setTimeout(() => {
          setIsMouseNearDynamicIsland(false);
        }, 1000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () => setTimeout(() => setIsMouseNearDynamicIsland(false), 1000));

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
      {/* <CustomScrollbar> */}
      {children}
      {/* </CustomScrollbar> */}
    </div>
  );
};

export default TemplatePage;
