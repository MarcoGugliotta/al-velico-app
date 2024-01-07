import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Blank from './app/screens/Blank';
import Home from './app/screens/Home';
import Start from './app/screens/Start';
import SignUp from './app/screens/SignUp';
import ResetPassword from './app/screens/ResetPassword';
import { StatusBar } from 'expo-status-bar';
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
    </InsideStack.Navigator>
  );
}

function StartLayout() {
  return (
    <InsideStack.Navigator>
      <Stack.Screen name='Start' component={Start} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='ResetPassword' component={ResetPassword} options={{ headerShown: false }}></Stack.Screen>
    </InsideStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }}></Stack.Screen> 
        : <Stack.Screen name='StartScreen' component={StartLayout} options={{ headerShown: false }}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
