interface IImage {
  url: string;
  key: string;
}
export interface IPost {
  userId: object;
  description: string;
  audience: 'public' | 'private' | 'friends' | 'friends-except' | 'only-me';
  images: IImage[];
}
