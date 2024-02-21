import React from 'react';
import Layout from '@/components/Layouts/Template';

const Templates: React.FC = () => {
  return (
    <Layout>
      <div className="grid place-items-center lg:mt-32 mt-20 px-52">
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <h2 className="text-white text-5xl left-0">Templates</h2>
      </div>
    </Layout>
  );
};

export default Templates;
