import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../../modules/auth/AuthScreen';
import OnboardingScreen from '../../modules/auth/OnboardingScreen';
import { useAppSelector } from '../../hooks/useRedux';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isFirstTime = useAppSelector((state) => state.authSlice.onboarding);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
