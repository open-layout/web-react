import { useState, useEffect } from 'react';
import { UserData } from './interfaces';

const useUserData = (response: UserData[]) => {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch()
        //   .then()
        setUserData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  });

  return userData;
};

export default useUserData;
