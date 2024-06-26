import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import config from '@/config';

import Layout from '@/components/ui/Template';

import LayoutCard from '@/components/ui/LayoutCard';
import SearchBar from '@/components/ui/SearchBar';
import LayoutCardSkeleton from '@/components/skeleton/LayoutCardSkeleton';

function LayoutsPage() {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<Array<object | unknown>>([]);
  const [exploreCache, setExploreCache] = useState<object[]>([]);
  const [searchParameters, setSearchParameters] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const navigate = useNavigate();

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
          ...config.api.headers,
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

  useEffect(() => {
    let failed_attempts = 0;
    const fetchData = async () => {
      setLoading(true);
      const repositoriesResponse = await fetchRepositories();

      setResponse(repositoriesResponse);
      setExploreCache(repositoriesResponse);
      const error = repositoriesResponse.length === 0;

      setLoading(error);

      if (!error) // If there are no errors don't continue
        return;

      failed_attempts++;

      if (failed_attempts >= 3) // If there are 3 failed attempts don't continue
        return;

      setTimeout(fetchData, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {

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
                ...config.api.headers,
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
                ...config.api.headers,
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

      setLoading(true);
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

      // console.log(repositoriesResponse);

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
  }, [authHeader, exploreCache, searchParameters]);

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layoutClick = (e: object | any, layout: string | any) => {
    if (
      // e.target.tagName === 'IMG' || 
      e.target.tagName === 'A' || 
      e.target.tagName === 'BUTTON'
    ) 
      return;

    navigate(`/layouts/${layout.name}`)
  }

  return (
    <Layout>
      <div className="grid place-items-center lg:mt-32 mt-20 px-1 lg:px-52">
        <h2 className="dark:text-white text-black text-5xl left-0 mb-10 font-bold">
          Layouts
        </h2>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-row flex-wrap justify-center gap-y-14 mt-12 mb-5">
          {(loading && !response) ? (
            <>
              {[...Array(6)].map((_a: null, i: number) => (
                <LayoutCardSkeleton key={i} />
              ))}
            </>
          ) : (!loading && response.length > 0) ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.map((info: object | any, index) => (
              <div 
                onClick={(e) => layoutClick(e, info)} 
                className='cursor-alias' 
                key={index}>
                <LayoutCard layout={info} />
              </div>
            ))) : (
              <p className="text-2xl w-full font-bold text-center mt-4">
                 No layouts found with <span className='font-bold text-red-600/70 line-through'>{searchParameters}</span> you might want to explore another universe.
                 <img 
                    loading='lazy'
                    className='mx-auto rounded-lg mt-8 w-96' 
                    src={config.not_found.img_api} 
                    alt="404 Not Found" 
                  />

              </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default LayoutsPage;
