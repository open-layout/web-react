import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import config from '@/config';

import Layout from '@/components/layouts/Template';

const LayoutDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [repoDetails, setRepoDetails] = useState<any>({});

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
    };

    fetchRepoDetails();
  }, [name]);

  const sanitize_name = (name: string): string => {
    return name.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <img
          // src={repoDetails?.images[0]}
          alt="Banner"
          className="w-[60%] h-40 object-center rounded-b-xl mb-4"
        />
        <h1>Repository Details for {name}</h1>
        <div>
          <h2>{repoDetails.name || 'No name'}</h2>
          <p>Description: {repoDetails.description}</p>
          <p>Author: {repoDetails.author}</p>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutDetailsPage;
