import { Artwork } from 'src/types/Artwork';

export const processArtworkDataArray = (
  data: any
): { artworks: Artwork[]; nextUrl: string; maxArtworks: number } => {
  const artworks: Artwork[] = [];

  data.data.forEach((artwork: any) => {
    artworks.push(processArtwork(artwork));
  });

  if (data.pagination)
    return { artworks, nextUrl: data.pagination.next_url, maxArtworks: data.pagination.total };
  else return { artworks, nextUrl: '', maxArtworks: 0 };
};

export const processArtwork = (artwork: any): Artwork => {
  let thumbnail = {
    altText: '',
    height: 0,
    width: 0,
    url: null
  };

  if (artwork.thumbnail) {
    thumbnail = {
      altText: artwork.thumbnail.alt_text,
      height: artwork.thumbnail.height,
      width: artwork.thumbnail.width,
      url: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/250,/0/default.jpg`
    };
  }
  return {
    artist: {
      id: artwork.artist_id,
      name: artwork.artist_title,
      display: artwork.artist_display
    },
    id: artwork.id,
    name: artwork.title,
    date: artwork.date_display,
    origin: artwork.place_of_origin,
    thumbnail,
    description: artwork.description,
    image_id: artwork.image_id,
    techniques: artwork.technique_titles,
    styles: artwork.style_titles,
    categories: artwork.category_titles,
    copyright: artwork.copyright_notice
  };
};
