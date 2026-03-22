export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
  text: string;
  createdAt: string;
}