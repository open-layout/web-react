import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import config from '@/config';

import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Layout from '@/components/Layouts/Template';
import SearchBar from '@/components/ui/SearchBar';
import Form from '@/components/ui/LayoutsForm';

import Quit from '@/assets/icons/quit.svg';

type Repository = {
  html_url: string;
  full_name: string;
};

function Dashboard() {
  const authHeader = useAuthHeader();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [userLayouts, setUserLayouts] = useState<string[]>([]);
  const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>('');
  const [searchParameters, setSearchParameters] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
  const openPopupWithRepoUrl = (repoUrl: string) => {
    setSelectedRepoUrl(repoUrl);
    setIsPopupOpen(true);
  };

  const handleSearch = (value: string) => {
    if (typingTimeout) clearTimeout(typingTimeout!);

    const timeout = setTimeout(() => {
      setSearchParameters(value);
    }, 2000);

    setTypingTimeout(timeout);
  };

  const filterRepositoriesByName = (
    repositories: Repository[],
    searchText: string
  ) => {
    return repositories.filter((repo) => {
      return repo.full_name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const filteredRepositories = filterRepositoriesByName(
    repositories,
    searchParameters
  );

  return (
    <Layout>
      <div className="bg-black h-[100px] fixed z-40 top-0 w-full shadow-lg shadow-black"></div>
      <section className="lg:mt-32 mb-10 flex flex-col items-center px-20">
        <h2 className="text-5xl self-start ml-4">Dashboard</h2>
        <SearchBar onSearch={handleSearch} />
        <div className="grid place-content-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 mt-14 mr-10 mb-5">
          {filteredRepositories.map((repo, index) => (
            <TemplatesCard
              key={index}
              repo={repo}
              isAdded={checkIfAdded(repo)}
              banner={generateBannerUrl(repo.full_name)}
              togglePopup={() => openPopupWithRepoUrl(repo.html_url)}
            />
          ))}
          {isPopupOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
              <div className="bg-transparent p-8 rounded-lg shadow-md">
                <Form target={selectedRepoUrl} />
                <a onClick={togglePopup}>
                  <img src={Quit} className="w-16 absolute top-5 right-5 " />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
