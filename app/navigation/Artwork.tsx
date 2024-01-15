import { getArtwork } from '../../api/chicagoApi';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { processArtwork } from '../../utils/ProcessData';
import { Artwork } from '../../src/types/Artwork';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../src/store/favorites/selectors';
import { favorites } from '../../src/store/favorites/reducers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/navigation';

const { convert } = require('html-to-text');

export const ArtworkScreen = ({ navigation, route }: ArtworkScreenRouteProp) => {
  const { id, image_id } = route.params;

  const [artwork, setArtwork] = useState<Artwork | undefined>();
  const [favorite, setFavorite] = useState(false);

  const savedFavorites = useSelector(favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    setFavorite(!!savedFavorites.find(favId => id === favId));
    getArtwork(id).then(data => {
      const typedData = processArtwork(data.data);
      setArtwork(typedData);
    });
  }, []);

  const updateFavorite = useCallback(() => {
    if (favorite) {
      dispatch(removeFavorite({ id: artwork?.id }));
    } else {
      dispatch(addFavorite({ id: artwork?.id }));
    }
    setFavorite(!favorite);
  }, [favorite, artwork]);

  const fullScreen = useCallback(() => {
    navigation.navigate('FullscreenImage', {
      uri: `https://www.artic.edu/iiif/2/${image_id}/full/250,/0/default.jpg`,
      name: artwork?.name ?? ''
    });
  }, [navigation, artwork, image_id]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.image} onPress={fullScreen}>
        <ImageBackground
          style={styles.image}
          source={{ uri: `https://www.artic.edu/iiif/2/${image_id}/full/250,/0/default.jpg` }}
        />
      </Pressable>
      <View style={styles.dataContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{artwork?.name}</Text>
          <Pressable onPress={updateFavorite}>
            <Icon name={favorite ? 'star' : 'star-o'} size={26} style={styles.icon} />
          </Pressable>
        </View>
        <Text style={styles.data}>{artwork?.artist.name + ', ' + artwork?.date}</Text>
        <ScrollView>
          <Text style={styles.description}>{convert(artwork?.description, { wordwrap: 130 })}</Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Artist: </Text>
            {convert(artwork?.artist.display, { wordwrap: 130 })}
          </Text>
          {artwork?.origin && (
            <Text style={styles.description}>
              <Text style={styles.bold}>Origin: </Text>
              {artwork?.origin}
            </Text>
          )}
          {artwork?.techniques.length !== 0 && (
            <Text style={styles.description}>
              <Text style={styles.bold}>Techniques: </Text>
              {artwork?.techniques.join(', ')}
            </Text>
          )}
          {artwork?.styles.length !== 0 && (
            <Text style={styles.description}>
              <Text style={styles.bold}>Styles: </Text>
              {artwork?.styles.join(', ')}
            </Text>
          )}
          {artwork?.categories.length !== 0 && (
            <Text style={styles.description}>
              <Text style={styles.bold}>Categories: </Text>
              {artwork?.categories.join(', ')}
            </Text>
          )}
          {artwork?.copyright && (
            <Text style={styles.description}>
              <Text style={styles.bold}>Copyright: </Text>
              {artwork?.copyright}
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 3,
    width: '100%',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start'
  },
  dataContainer: {
    flex: 2,
    paddingTop: '8%',
    paddingHorizontal: '4%',
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  data: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 12
  },
  description: {
    marginBottom: 12
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  icon: {
    alignSelf: 'center'
  },
  bold: {
    fontWeight: 'bold'
  }
});

type ArtworkScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Artwork'>;
