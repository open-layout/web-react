// TemplatePage.tsx
import React, { ReactNode, useEffect, useState } from 'react';
// import DynamicIsland from '@/components/ui/DynamicIsland'; // src/components/Layouts/Template.tsx(3,27): error TS2307: Cannot find module '@/components/ui/DynamicIsland' or its corresponding type declarations.
import DynamicIsland from '../ui/DynamicIsland';
import config from '@/config';

interface TemplatePageProps {
  children: ReactNode;
  className?: string;
  darkMode?: boolean;
}

/**
 * Base layout for all pages, this will wrap all the pages inside this layout
 */
const TemplatePage: React.FC<TemplatePageProps> = ({ className, children }) => {
  const [importantRead, setImportantRead] = useState(localStorage.getItem('importantRead') === 'true');

  useEffect(() => {
    localStorage.setItem('importantRead', importantRead.toString());
  }, [importantRead]);
  
  return (
    <div className={'text-black dark:text-white ' + className}>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <DynamicIsland />
      {config.impotant_message && !importantRead && (
        <div 
          onClick={() => setImportantRead(true)}
          className="hidden lg:grid place-content-center h-10 bg-green-400/40 backdrop-blur-lg absolute top-5 right-5 rounded-xl border-2 border-green-500/50 animate-pulse hover:bg-green-400/80 hover:border-green-700 hover:animate-none cursor-pointer max-w-96 truncate"
          >
          <h1 className="font-bold px-3">{config.impotant_message}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default TemplatePage;
