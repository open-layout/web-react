import React from 'react';
import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Layout from '@/components/Layouts/Template';

const dashboard: React.FC = () => {
  return (
    <Layout>
      <section className="lg:mt-32 grid place-content-end">
        <h2 className="text-white text-5xl left-0 mb-3">Dashboard</h2>
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
      </section>
    </Layout>
  );
};

export default dashboard;
