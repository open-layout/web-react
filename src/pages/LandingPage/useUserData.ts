import { useState, useEffect } from "react";
import { UserData } from "./interfaces";

const useUserData = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const response = [
    {
      username: "IMXNOOBX",
      avatar: "https://avatars.githubusercontent.com/u/69653071?v=4",
      bio:
        "• hey hi! hope you have a great day! •ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ  \r\n" +
        "•> Hiii im noob!ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ•> If you need help dm me <3",
      created_at: "2020-08-13T21:26:43Z",
    },
    {
      username: "AzalDevX",
      avatar: "https://avatars.githubusercontent.com/u/98758892?v=4",
      bio: "Programming is the art of creating something out of nothing with just a couple of ideas. 🚀",
      created_at: "2022-01-31T15:11:06Z",
    },
    {
      username: "AngleSad",
      avatar: "https://avatars.githubusercontent.com/u/118389540?v=4",
      bio: "Programming is the bridge between imagination and reality, where each line of code is a step towards the materialization of innovative ideas. 🪐",
      created_at: "2022-04-19T12:45:00Z",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch()
        //   .then()
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  });

  return userData;
};

export default useUserData;
