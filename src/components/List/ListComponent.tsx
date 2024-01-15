import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Artwork } from 'src/types/Artwork';
import { ArtworkListItem } from './ListItem';
import { useCallback } from 'react';

type ListProps = {
  data: Artwork[];
  fetchMore: () => Promise<void>;
  hasMoreData: boolean;
  goToArtwork: (id: string, image_id: string, name: string) => void;
};

export const ArtworksList = ({ data, fetchMore, hasMoreData, goToArtwork }: ListProps) => {
  const renderItem = useCallback(
    (item: Artwork) => {
      return (
        <View style={styles.item}>
          <ArtworkListItem
            image={item.thumbnail}
            artistName={item.artist.name}
            date={item.date}
            title={item.name}
            onPress={() => goToArtwork(item.id, item.image_id, item.name)}
          />
        </View>
      );
    },
    [goToArtwork]
  );

  const onEndReached = useCallback(() => {
    if (hasMoreData) {
      fetchMore();
    }
  }, [fetchMore, hasMoreData]);

  const renderListFooterComponent = useCallback(() => {
    if (hasMoreData) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color="grey" />
          <Text style={styles.loadingText}>Loading more items</Text>
        </View>
      );
    } else {
      return <></>;
    }
  }, [hasMoreData]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        numColumns={2}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={onEndReached}
        ListFooterComponent={renderListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%'
  },
  list: {
    maxWidth: '100%',
    alignContent: 'space-between',
    marginHorizontal: '4%'
  },
  item: {
    flex: 1,
    marginBottom: '4%',
    marginHorizontal: '1%'
  },
  loading: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 12
  },
  loadingText: {
    marginLeft: 8,
    fontStyle: 'italic'
  }
});
