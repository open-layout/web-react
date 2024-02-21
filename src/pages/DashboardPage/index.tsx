import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

import DynamicIsland from '@/components/ui/dynamicIsland';
import TemplatesCard from '@/components/ui/templatesCar';
import DashboardMenu from '@/components/ui/dashboardmenu';
import Switch from '@/components/ui/Switch';
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
    
    <section className="grid place-items-center lg:mt-32 mt-20 px-52">
        <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <DynamicIsland />
      <h2 className="text-white text-5xl left-0">
        Dashboard
      </h2>
      <Switch/>
      <DashboardMenu/>
      <div className="ml-20 flex flex-row flex-wrap overflow-x-hidden justify-around gap-16 my-16 h-[620px]">
          
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          
          <TemplatesCard/>
          <TemplatesCard/>
          <TemplatesCard/>
          
          
        
      </div>
    </section>
  );
};

export default dashboard;