export const getArtworks = async () => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?limit=10`,
      {
        method: 'GET',
      },
    );

    return await response.json();
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const getArtwork = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${id}`,
      {
        method: 'GET',
      },
    );

    return await response.json()
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const getFavoriteArtworks = async (ids: string[]) => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?limit=10&ids=${ids.toString()}`,
      {
        method: 'GET',
      },
    );

    return await response.json();
  } catch (e) {
    console.log('Error: ', e);
  }
};
