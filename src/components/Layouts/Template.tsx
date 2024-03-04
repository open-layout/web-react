// TemplatePage.tsx
import React, { ReactNode } from 'react';
import DynamicIsland from '@/components/ui/DynamicIsland';
import config from '@/config';

interface TemplatePageProps {
  children: ReactNode;
  darkMode?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children }) => {
  return (
    <div className={'text-black dark:text-white'}>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <DynamicIsland />
      {config.impotant_message && (
        <div className="grid place-content-center h-10 bg-green-400 absolute top-5 right-5 rounded-lg border-2 border-green-500">
          <h1 className="font-bold px-3">{config.impotant_message}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default TemplatePage;
