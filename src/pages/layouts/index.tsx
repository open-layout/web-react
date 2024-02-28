import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import config from '@/config';

import Layout from '@/components/layouts/Template';

import LayoutCard from '@/components/ui/LayoutCard';
import SearchBar from '@/components/ui/SearchBar';
import LayoutCardSkeleton from '@/components/skeleton/LayoutCardSkeleton';

function LayoutsPage() {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<object[]>([]);
  const [exploreCache, setExploreCache] = useState<object[]>([]);
  const [searchParameters, setSearchParameters] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Function to handle search input
  const handleSearch = (value: string) => {
    if (typingTimeout) clearTimeout(typingTimeout!);

    const timeout = setTimeout(() => {
      setSearchParameters(value);
    }, 1000);

    setTypingTimeout(timeout);
  };

  // Function to fetch repositories data
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

  // Function to fetch search results
  const fetchSearch = async (
    query: string = '',
    layout: string = '',
    author: string = '',
    language: string = '',
    category: string = ''
  ) => {
    try {
      if (query && !layout && !author && !language && !category) {
        const response = await fetch(
          config.api.baseurl + '/templates/find' + `?query=${query}`,
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
      } else {
        const search_query = `?name=${layout}&author=${author}&language=${language}&category=${category}`;
        console.log(search_query);

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
      }
    } catch (error) {
      console.error('[API] ', error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch repositories data on component mount
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
    // Fetch search results when search parameters change
    const fetchData = async () => {
      let repositoriesResponse;

      // Split search parameters into individual parameters
      const parameters = searchParameters.split(' ');

      // Get values of individual parameters
      const author =
        parameters
          .find((param) => param.startsWith('author:'))
          ?.split(':')[1] || '';
      const layout =
        parameters
          .find((param) => param.startsWith('layout:'))
          ?.split(':')[1] || '';
      const category =
        parameters
          .find((param) => param.startsWith('category:'))
          ?.split(':')[1] || '';
      const language =
        parameters
          .find((param) => param.startsWith('language:'))
          ?.split(':')[1] || '';

      // Check if all individual parameters are empty
      const allEmpty = !author && !layout && !category && !language;

      if (allEmpty) {
        // If all parameters are empty, perform search based on complete query
        repositoriesResponse = await fetchSearch(searchParameters);
      } else {
        // If at least one parameter is present, perform search based on individual parameters
        repositoriesResponse = await fetchSearch(
          searchParameters,
          layout,
          author,
          language,
          category
        );
      }

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
      <div className="grid place-items-center lg:mt-32 mt-20 px-1 lg:px-52">
        <h2 className="dark:text-white text-black text-5xl left-0 mb-10 font-bold">
          Layouts
        </h2>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-row flex-wrap justify-center gap-y-14 mt-12 xl:mr-10 mb-5">
          {loading ? (
            <>
              {[...Array(6)].map(() => (
                <LayoutCardSkeleton />
              ))}
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
