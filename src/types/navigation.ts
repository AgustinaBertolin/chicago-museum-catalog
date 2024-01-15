// Properties of the views
export type RootStackParamList = {
  Home: undefined;
  Artwork: {
    id: string;
    image_id: string;
    name: string;
  };
  FullscreenImage: {
    uri: string;
    name: string;
  };
  Artworks: undefined;
  Favorites: undefined;
};
