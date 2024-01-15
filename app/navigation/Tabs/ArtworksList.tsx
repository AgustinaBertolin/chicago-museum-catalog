import { getArtworks } from '../../../api/chicagoApi';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { processArtworkDataArray } from '../../../utils/ProcessData';
import { ArtworksList } from '../../../src/components/List/ListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { artworks } from '../../../src/store/artworks/reducers';
import { addArtworks } from '../../../src/store/artworks/selectors';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from 'src/types/navigation';

export const ArtworksScreen = ({ navigation }: ArtworksScreenRouteProp) => {
  const [nextUrl, setNextUrl] = useState<undefined | string>();
  const [maxData, setMaxData] = useState(0);

  const artworksData = useSelector(artworks);

  const dispatch = useDispatch();

  useEffect(() => {
    getArtworks().then(data => {
      const typedData = processArtworkDataArray(data);
      dispatch(addArtworks({ artworks: typedData.artworks }));
      setNextUrl(typedData.nextUrl);
      setMaxData(typedData.maxArtworks);
    });
  }, []);

  const getMoreArtworks = useCallback(async () => {
    if (nextUrl) {
      const moreAtworks = await fetch(nextUrl, { method: 'GET' });
      const typedData = processArtworkDataArray(await moreAtworks.json());
      dispatch(addArtworks({ artworks: typedData.artworks }));
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
        data={artworksData}
        fetchMore={getMoreArtworks}
        hasMoreData={maxData > artworksData.length}
        goToArtwork={goToArtwork}
      />
    </View>
  );
};

type ArtworksScreenRouteProp = BottomTabScreenProps<RootStackParamList, 'Artworks'>;
