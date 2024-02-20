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

interface FoundersProps {
  userData: UserData[];
}

export type { UserData, PresentationCardProps, FoundersProps };
