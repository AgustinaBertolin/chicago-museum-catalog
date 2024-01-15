import { getFavoriteArtworks } from '../../../api/chicagoApi';
import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ArtworksList } from '../../../src/components/List/ListComponent';
import { favorites } from '../../../src/store/favorites/reducers';
import { Artwork } from '../../../src/types/Artwork';
import { processArtworkDataArray } from '../../../utils/ProcessData';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from 'src/types/navigation';

export const FavoritesScreen = ({ navigation }: FavoritesScreenRouteProp) => {
  const [nextUrl, setNextUrl] = useState<undefined | string>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const savedFavorites = useSelector(favorites);

  useEffect(() => {
    if (savedFavorites.length > 0) {
      getFavoriteArtworks(savedFavorites).then(data => {
        const typedData = processArtworkDataArray(data);
        setArtworks(typedData.artworks);
        setNextUrl(typedData.nextUrl);
      });
    }
  }, [savedFavorites]);

  const getMoreArtworks = useCallback(async () => {
    if (nextUrl) {
      const moreAtworks = await fetch(nextUrl, { method: 'GET' });
      const typedData = processArtworkDataArray(moreAtworks.json());
      setArtworks(typedData.artworks);
      setNextUrl(typedData.nextUrl);
    }
  }, [nextUrl]);

  const goToArtwork = useCallback(
    (id: string, image_id: string, name: string) => {
      navigation.navigate('Artwork', { id, image_id, name });
    },
    [navigation]
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ArtworksList
        data={artworks}
        fetchMore={getMoreArtworks}
        hasMoreData={artworks.length > 0 && savedFavorites.length > artworks.length}
        goToArtwork={goToArtwork}
      />
    </View>
  );
};

type FavoritesScreenRouteProp = BottomTabScreenProps<RootStackParamList, 'Favorites'>;
