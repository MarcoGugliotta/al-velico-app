import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/LoginScreen';
import { useCallback, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartScreen from './app/screens/StartScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';
import { StatusBar } from 'expo-status-bar';
import TabsComponent from './app/components/TabsComponent';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import CareerDetailLayout from './app/components/CareerDetailLayout';

SplashScreen.preventAutoHideAsync();


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function StartLayout() {
  return (
    <InsideStack.Navigator>
      <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} options={{ headerShown: false }}></Stack.Screen>
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'rale-r': require('./assets/fonts/Raleway-Regular.ttf'),
    'rale-sb': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'rale-b': require('./assets/fonts/Raleway-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Start'>
        {user ? (
                <>
                  <Stack.Screen name='Tabs' component={TabsComponent} options={{ headerShown: false }}></Stack.Screen>
                  <Stack.Screen name='CareerDetailLayout' component={CareerDetailLayout} options={{ headerShown: false }}></Stack.Screen>
                </>
        ) 
        : <Stack.Screen name='StartLayout' component={StartLayout} options={{ headerShown: false }}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
