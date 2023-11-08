import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../modules/dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const bottomRoutes = [
  { component: Dashboard, name: 'Dashboard', label: 'Головна' },
  { component: Dashboard, name: 'CachedMusic', label: 'Бібліотека' },
  { component: Dashboard, name: 'Settings', label: 'Налаштування' },
];

const MainStack = () => {
  return (
    <Tab.Navigator>
      {bottomRoutes.map(({ name, component }, index) => (
        <Tab.Screen key={index} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default MainStack;
