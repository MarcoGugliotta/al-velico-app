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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Home') {
          return (
            <Entypo name="home" size={size} color={color} />
          );
        } else if (route.name === 'User') {
          return (
            <FontAwesome name="user" size={size} color={color}  />
          );
        }else if (route.name === 'Carriera') {
          return (
            <FontAwesome name="trophy" size={size} color={color}  />
          );
        }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: '#F49A54',
    })}
  >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Carriera" component={Blank} options={{ headerShown: false }} />
      <Tab.Screen name="User" component={Blank} options={{ headerShown: false }} />
    </Tab.Navigator>
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
        {user ? <Stack.Screen name='Tabs' component={Tabs} options={{ headerShown: false }}></Stack.Screen> 
        : <Stack.Screen name='StartLayout' component={StartLayout} options={{ headerShown: false }}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
