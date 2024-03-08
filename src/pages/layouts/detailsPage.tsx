import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsLayout from '@/pages/layouts/detailsLayout';

import config from '@/config';

import Layout from '@/components/Layouts/Template';

const LayoutDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [repoDetails, setRepoDetails] = useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`${config.api.baseurl}/templates/layout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        });
        const data = await response.json();
        setRepoDetails(data.data);
  
        console.log('Repository details:', data);
      } catch (error) {
        console.error('Error fetching repository details:', error);
      }
  
      setLoading(false);
    };
    
    if (name)
      fetchRepoDetails();
  }, [name]);

  return (
    <Layout>

      {loading ? (
        <div className='flex flex-col justify-center items-center h-screen'>
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
          <div className='text-base mt-4'>
            Searching in the wild internet for <span className='font-extrabold text-violet-600'>{name}</span>
          </div>
        </div>
      ) : (<>
        {repoDetails ? (
          <DetailsLayout layout={repoDetails} />
        ) : (
          <div className='flex flex-col justify-center items-center h-screen'>
            <div className='text-xl mt-4 text-gray-400'>
              Could not find <span className='font-bold text-red-600/70 line-through'>{name}</span> you might want to use <a href="/layouts" className='underline text-indigo-600 font-bold'>our seach</a> to find it.
            </div>
        </div>
        )}
      </>)}
    </Layout>
  );
};

export default LayoutDetailsPage;
