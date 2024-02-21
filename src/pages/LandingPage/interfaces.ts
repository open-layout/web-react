// interfaces.ts

interface UserData {
  username: string;
  avatar: string;
  bio: string;
  created_at: string;
}

interface PresentationCardProps {
  name: string;
  image: string;
  description: string;
  date: string;
  link: string;
}
interface TemplatesCardProps {
  name: string;
  image: string;
  description: string;
  date: string;
  link: string;
  languages: string;
}

interface FoundersProps {
  userData: UserData[];
  darkMode: boolean;
}

interface AboutUsProps {
  darkMode: boolean;
}

export type {
  UserData,
  PresentationCardProps,
  FoundersProps,
  AboutUsProps,
  TemplatesCardProps,
};
