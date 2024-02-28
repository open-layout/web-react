import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layouts/Template';
import LayoutCard from '@/components/ui/LayoutCard';
import config from '@/config';
import SearchBar from '@/components/ui/SearchBar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import LayoutCardSkeleton from '@/components/skeleton/LayoutCardSkeleton';
import { Link } from 'react-router-dom';

function LayoutsPage() {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<object[]>([]);
  const [exploreCache, setExploreCache] = useState<object[]>([]);
  const [searchParameters, setSearchParameters] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearch = (value: string) => {
    if (typingTimeout) clearTimeout(typingTimeout!);

    const timeout = setTimeout(() => {
      setSearchParameters(value);
    }, 2000);

    setTypingTimeout(timeout);
  };

  const fetchRepositories = async () => {
    try {
      const response = await fetch(config.api.baseurl + '/templates/explore', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
      });

      const data = await response.json();

      if (!data.success) {
        console.error('Error fetching repositories:', data.message);
        return [];
      }

      return data.results;
    } catch (error) {
      console.error('[API] ', error);
      return [];
    }
  };

  const fetchSearch = async (
    query: string = '',
    layout: string = '',
    author: string = '',
    language: string = '',
    category: string = ''
  ) => {
    try {
      const search_query = `?layout=${layout}&author=${author}&language=${language}&category=${category}&query=${query}`;

      const response = await fetch(
        config.api.baseurl + '/templates/find' + search_query,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader || '',
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        console.error('Error fetching repositories:', data.message);
        return [];
      }

      return data.results;
    } catch (error) {
      console.error('[API] ', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const repositoriesResponse = await fetchRepositories();
      console.log(repositoriesResponse);

      setResponse(repositoriesResponse);
      setExploreCache(repositoriesResponse);
      const error = repositoriesResponse.length === 0;

      setLoading(error);
      if (!error) return;

      setTimeout(() => {
        fetchData();
      }, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let repositoriesResponse;
      const parameters = searchParameters.split(' ');
      const author = parameters
        .find((param) => param.startsWith('author:'))
        ?.split(':')[1];
      const layout = parameters
        .find((param) => param.startsWith('layout:'))
        ?.split(':')[1];
      const category = parameters
        .find((param) => param.startsWith('category:'))
        ?.split(':')[1];
      const language = parameters
        .find((param) => param.startsWith('language:'))
        ?.split(':')[1];
      console.log(parameters);
      if (
        author === undefined ||
        layout === undefined ||
        category === undefined ||
        language === undefined
      ) {
        repositoriesResponse = await fetchSearch(searchParameters);
      } else {
        repositoriesResponse = await fetchSearch(
          // searchParameters,
          layout,
          author,
          language,
          category
        );
      }
      console.log(author, layout, category, language);

      // const repositoriesResponse = await fetchSearch(searchParameters);
      console.log(repositoriesResponse);

      setResponse(repositoriesResponse);
      const getSuccess = repositoriesResponse.length === 0;

      setLoading(getSuccess);
      if (!getSuccess) return;
    };

    if (searchParameters) {
      fetchData();
    } else {
      setResponse(exploreCache);
      setLoading(false);
    }
  }, [searchParameters]);

  return (
    <Layout>
      <div className="grid place-items-center lg:mt-32 mt-20 px-5 lg:px-52">
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <h2 className="text-white text-5xl left-0">Layouts</h2>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-16 mt-14 mr-10 mb-5">
          {loading ? (
            <>
              <LayoutCardSkeleton />
              <LayoutCardSkeleton />
              <LayoutCardSkeleton />
              <LayoutCardSkeleton />
              <LayoutCardSkeleton />
              <LayoutCardSkeleton />
            </>
          ) : (
            response.map((info, index) => (
              <Link to={`/layouts/${info.name}`} key={index}>
                <LayoutCard layout={info} />
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default LayoutsPage;
