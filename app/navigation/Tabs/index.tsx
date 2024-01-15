import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ArtworksScreen } from "./ArtworksList";
import { FavoritesScreen } from "./FavoritesList";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Artworks">
      <Tab.Screen name="Artworks" component={ArtworksScreen} options={{
        tabBarIcon: ({color}: {
          focused: boolean;
          color: string;
          size: number;
        }) =>  <Icon name="image" size={16} color={color}/>,
          tabBarLabelStyle: {
            fontSize: 14
          },
        }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
        tabBarIcon: ({color}: {
          focused: boolean;
          color: string;
          size: number;
        }) =>  <Icon name="star" size={16} color={color}/>,
          tabBarLabelStyle: {
            fontSize: 14
          },
        }}  />
    </Tab.Navigator>
  )
}