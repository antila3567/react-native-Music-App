import React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './authStack/AuthStack';
import MainStack from './mainStack/MainStack';
import { useAppSelector } from '../hooks/useRedux';
import colors from '../utils/colors';

const Stack = createNativeStackNavigator();

type RootStackParamList = {};

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

const Navigation = () => {
  const isAuth = useAppSelector((state) => state.authSlice.isAuthenticated);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
