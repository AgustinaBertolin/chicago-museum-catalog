import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { TabNavigation } from './Tabs';
import { ArtworkScreen } from './Artwork';
import { FullscreenImageScreen } from './FullscreenImage';
const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
      <Stack.Screen
        name="Artwork"
        component={ArtworkScreen}
        options={props => {
          return {
            headerTitle: props.route.params.name
          };
        }}
      />
      <Stack.Screen
        name="FullscreenImage"
        component={FullscreenImageScreen}
        options={props => {
          return {
            headerTransparent: true,
            headerTintColor: 'white',
            headerTitle: props.route.params.name
          };
        }}
      />
    </Stack.Navigator>
  );
};
