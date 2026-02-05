export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: User;
  width: number;
  height: number;
  tags: string[];
}

export interface Board {
  id: string;
  name: string;
  pins: Pin[];
  isPrivate: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}