import { useEffect, useState } from 'react';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import config from '@/config';

import TemplatesCard from '@/components/ui/DashboardCard';
import DashboardCardSkeleton from '@/components/skeleton/DashboardCardSkeleton';
import Layout from '@/components/Layouts/Template';
import SearchBar from '@/components/ui/SearchBar';
import Form from '@/components/ui/LayoutsForm';

import Quit from '@/assets/icons/quit.svg';

type Repository = {
  url: string;
  html_url: string;
  name: string;
  fullname: string;
};

function Dashboard() {
  const authHeader = useAuthHeader();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [userLayouts, setUserLayouts] = useState([]);
  const [selectedRepoUrl, setSelectedRepoUrl] = useState('');
  const [searchParameters, setSearchParameters] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [loading, setLoading] = useState(true);

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
          data.data.map((layout: object | any) =>
            getLastSegmentOfUrl(layout.repository)
          )
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
      setLoading(true); // Set loading to true when fetching data
      const repositoriesResponse = await fetchRepositories();
      setRepositories(repositoriesResponse);
      setLoading(false); // Set loading to false when data is fetched
      await getUserLayouts();
    };

    fetchData();
  }, []);

  const checkIfAdded = (repo: Repository) => {
    const repoName = getLastSegmentOfUrl(repo.url) as never;

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
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      setSearchParameters(value);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const filterRepositoriesByName = (
    repositories: Repository[],
    searchText: string
  ) => {
    return repositories.filter((repo) => {
      // console.log(repo);

      return repo.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const filteredRepositories = filterRepositoriesByName(
    repositories,
    searchParameters
  );

  return (
    <Layout>
      <div className="dark:bg-black bg-white h-[100px] fixed z-40 top-0 w-full shadow-lg dark:shadow-black shadow-white"></div>
      <section className="lg:mt-32 mt-14 mb-10 flex flex-col items-center px-5 lg:px-20">
        <h2 className="text-5xl ld:self-start ml-4 mb-10 font-bold">Dashboard</h2>
        <SearchBar onSearch={handleSearch} />
        <div className="grid place-content-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 mt-14 mr-10 mb-5">
          {loading ? ( // Render skeleton cards while data is loading
            <>
              {[...Array(6)].map(() => <DashboardCardSkeleton />)}
            </>
          ) : (
            filteredRepositories.map((repo, index) => (
              <TemplatesCard
                key={index}
                repo={repo}
                isAdded={checkIfAdded(repo)}
                banner={generateBannerUrl(repo.fullname as string)}
                togglePopup={() => openPopupWithRepoUrl(repo.url)}
              />
            ))
          )}
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
