import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Layout from '@/components/Layouts/Template';

import config from '@/config';

function dashboard() {
  const authHeader = useAuthHeader();
  const [repositories, setRepositories] = useState([]);

  const fetch_repositories = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/user/repositories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader || ''
        }
      });

      return await response.json(); // Access the 'url' property from the data object
    } catch (error) {
      console.error('[API] ', error);
      return false;
    }
  }

  const get_repositories = async () => {
    const response = await fetch_repositories();

    if (response.success) {
      setRepositories(response.data);
      console.log('Repositories:', response.data)
    } else {
      console.log('Error fetching repositories:', response.message)
    }
  }

  useEffect(() => {
    get_repositories();
  }, []);

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
