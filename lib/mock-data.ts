export interface MockProperty {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  image: string;
  followers: number;
}

export interface MockVideo {
  id: string;
  thumbnailUrl: string;
  videoUrl?: string;
  likeCount: number;
  user: {
    username: string;
    avatarUrl?: string;
  };
  propertyId?: string;
  property?: {
    name?: string;
  };
}
