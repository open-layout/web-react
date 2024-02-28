// TemplatePage.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import DynamicIsland from '@/components/ui/DynamicIsland';

interface TemplatePageProps {
  children: ReactNode;
  darkMode?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children }) => {
  return (
    <div className={'text-black dark:text-white'}>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <DynamicIsland />
      {children}
    </div>
  );
};

export default TemplatePage;
