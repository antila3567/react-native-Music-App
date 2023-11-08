import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../modules/dashboard/Dashboard';
import colors from '../../utils/colors';

const Tab = createBottomTabNavigator();

const bottomRoutes = [
  {
    component: Dashboard,
    name: 'Dashboard',
  },
  { component: Dashboard, name: 'Settings' },
];

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.MAIN_BLACK,
        },
      })}
    >
      {bottomRoutes.map(({ name, component, navigationOptions }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainStack;
