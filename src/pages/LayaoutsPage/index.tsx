import React from 'react';
import Layout from '@/components/Layouts/Template';
import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import LoginButton from '@/components/ui/LoginButton';

const LayaoutsPage: React.FC = () => {
  return (
    <Layout>
      <div className="grid place-items-center lg:mt-32 mt-20 px-52">
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <LoginButton />
        <h2 className="text-white text-5xl left-0">Layouts</h2>

        <DashboardMenu />
        <div className="grid grid-cols-3 gap-16 mt-14 mr-10 mb-5">
          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />

          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />

          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />

          <TemplatesCard />
          <TemplatesCard />
          <TemplatesCard />
        </div>
      </div>
    </Layout>
  );
};  

export default LayaoutsPage;
