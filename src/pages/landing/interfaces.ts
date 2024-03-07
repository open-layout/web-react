// interfaces.ts

interface UserData {
  username: string;
  avatar: string;
  bio: string;
  created_at: string;
  badges: BadgesData[];
}

interface BadgesData {
  id: string;
  name: string;
}

interface PresentationCardProps {
  name: string;
  image: string;
  description: string;
  date: string;
  link: string;
  badges: BadgesData[];
}
interface TemplatesCardProps {
  name: string;
  image: string;
  description: string;
  date: string;
  link: string;
  languages: string;
}

interface DevelopersProps {
  userData: UserData[];
}

export type {
  UserData,
  PresentationCardProps,
  DevelopersProps,
  TemplatesCardProps,
};
