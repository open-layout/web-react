import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Layout from '@/components/Layouts/Template';

import config from '@/config';

function Dashboard() {
  const authHeader = useAuthHeader();
  const [repositories, setRepositories] = useState([]);

  const fetch_repositories = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/user/repositories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
      });

      return await response.json(); // Access the 'url' property from the data object
    } catch (error) {
      console.error('[API] ', error);
      return false;
    }
  };

  const get_repositories = async () => {
    const response = await fetch_repositories();

    if (response.success) {
      setRepositories(response.data);
      console.log('Repositories:', response.data);
    } else {
      console.log('Error fetching repositories:', response.message);
    }
  };

  useEffect(() => {
    get_repositories();
  }, []);

  return (
    <Layout>
      <div className="bg-black h-[100px] fixed z-40 top-0 w-full shadow-lg shadow-black"></div>
      <section className="lg:mt-32 mb-10 grid place-content-center lg:place-content-end xl:w-[90%]">
        <h2 className="text-5xl">Dashboard</h2>
        <div className="grid place-content-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 mt-14 mr-10 mb-5">
          <DashboardMenu />
          {repositories.map((repo) => (
            <TemplatesCard repo={repo} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
