import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Layout from '@/components/Layouts/Template';

import config from '@/config';

type Repository = {
  html_url: string;
  full_name: string;
};

function Dashboard() {
  const authHeader = useAuthHeader();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [userLayouts, setUserLayouts] = useState<string[]>([]);

  const fetchRepositories = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/user/repositories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
      });

      const data = await response.json();
      if (data.success) {
        return data.data as Repository[];
      } else {
        console.error('Error fetching repositories:', data.message);
        return [];
      }
    } catch (error) {
      console.error('[API] ', error);
      return [];
    }
  };

  const getUserLayouts = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/user/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setUserLayouts(
          data.data.map((layout: any) => getLastSegmentOfUrl(layout.repository))
        );
      } else {
        setUserLayouts([]);
      }

      return data;
    } catch (error) {
      console.error('[API] ', error);
      return [];
    }
  };

  const getLastSegmentOfUrl = (url: string) => {
    const segments = url.split('/');
    return segments.pop() || '';
  };

  useEffect(() => {
    const fetchData = async () => {
      const repositoriesResponse = await fetchRepositories();
      console.log(repositoriesResponse);

      setRepositories(repositoriesResponse);
      await getUserLayouts();
    };

    fetchData();
  }, []);

  const checkIfAdded = (repo: Repository) => {
    const repoName = getLastSegmentOfUrl(repo.html_url);
    return userLayouts.includes(repoName);
  };

  const generateBannerUrl = (full_name: string) => {
    return (
      `https://opengraph.githubassets.com/1/${full_name}` ||
      `https://opengraph.githubassets.com/${full_name}`
    );
  };

  return (
    <Layout>
      <div className="bg-black h-[100px] fixed z-40 top-0 w-full shadow-lg shadow-black"></div>
      <section className="lg:mt-32 mb-10 grid place-content-center lg:place-content-end xl:w-[90%]">
        <h2 className="text-5xl">Dashboard</h2>
        <div className="grid place-content-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 mt-14 mr-10 mb-5">
          <DashboardMenu />
          {repositories.map((repo, index) => (
            <TemplatesCard
              key={index}
              repo={repo}
              isAdded={checkIfAdded(repo)}
              banner={generateBannerUrl(repo.full_name)}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
