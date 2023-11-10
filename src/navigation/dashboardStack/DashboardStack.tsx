import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../../modules/dashboard/DashboardScreen';
import ArtistProfileScreen from '../../modules/dashboard/artistProfile/ArtistProfileScreen';
import TrackProfileScreen from '../../modules/dashboard/trackProfile/TrackProfileScreen';

const Stack = createNativeStackNavigator();

const dashboardRoutes = [
  {
    component: DashboardScreen,
    name: 'DashboardScreen',
  },
  {
    component: ArtistProfileScreen,
    name: 'ArtistProfileScreen',
  },
  {
    component: TrackProfileScreen,
    name: 'TrackProfileScreen',
  },
];

const routesWithOutHeader = ['DashboardScreen'];

const DashboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      {dashboardRoutes.map(({ name, component }, i) => (
        <Stack.Screen
          key={i}
          name={name}
          component={component}
          options={{
            headerShown: !routesWithOutHeader.includes(name),
            presentation: 'modal',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default DashboardStack;
