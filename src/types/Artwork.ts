export type Artwork = {
  artist: {
    id: string,
    name: string,
    display: string
  },
  id: string,
  name: string,
  date: string,
  origin: string,
  description: string,
  image_id: string,
  techniques: string[],
  styles: string[],
  categories: string[],
  copyright: string,
  thumbnail: {
    altText: string,
    height: number,
    width: number,
    url: string | null
  }
}