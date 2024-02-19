import { useState, useEffect } from 'react';

interface UserData {
  login: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  html_url: string;
}

const useUserData = (usernames: string[]) => {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = usernames.map(username =>
          fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
        );
        const data = await Promise.all(promises);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [usernames]);

  return userData;
};

export default useUserData;
