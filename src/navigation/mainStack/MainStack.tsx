import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../modules/dashboard/Dashboard';
import colors from '../../utils/colors';
import TabBarButtons from './bottomTabs/TabBarButtons';
import CircleButton from './bottomTabs/CircleButton';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

const MockComponent = () => null;

const bottomRoutes = [
  {
    component: Dashboard,
    name: 'Dashboard',
  },
  { component: MockComponent, name: 'CentralBtn', middle: true },
  { component: Dashboard, name: 'Settings' },
];

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        style: styles.navigator,
        labelStyle: { display: 'none' },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        },
      })}
      tabBar={(props) => {
        return (
          <View style={[styles.navigatorContainer]}>
            <BottomTabBar {...props} />
            <View style={[styles.xFillLine]} />
          </View>
        );
      }}
    >
      {bottomRoutes.map(({ name, component, middle = false }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            headerShown: false,
            tabBarButton: (props) =>
              middle ? <CircleButton /> : <TabBarButtons props={props} name={name} index={index} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: colors.SECONDARY_GRAY,
    zIndex: -1,
  },
});

export default MainStack;
