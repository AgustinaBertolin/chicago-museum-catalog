import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type ListItemProps = {
  image: {
    altText: string;
    height: number;
    width: number;
    url: string | null;
  };
  artistName: string;
  date: string;
  title: string;
  onPress: () => void;
};

const img = require('../../../assets/images/Placeholder_view_vector.png');

export const ArtworkListItem = ({ image, artistName, date, title, onPress }: ListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          imageStyle={styles.imageBackground}
          style={styles.image}
          source={image.url ? { uri: image.url } : img}
        />
        <View style={styles.dataContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.data}>{artistName + ' ' + date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    maxWidth: Dimensions.get('window').width / 2.3
  },
  imageBackground: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7
  },
  image: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 7
  },
  dataContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    paddingBottom: 10
  },
  data: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 4
  }
});
