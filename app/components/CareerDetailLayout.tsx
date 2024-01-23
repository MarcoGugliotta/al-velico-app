import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CareerDetailScreen from "../screens/CareerDetailScreen";
import Career from "../models/Career";

const Stack = createNativeStackNavigator();

export default function CareerDetailLayout({route, navigation}) {
  return (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen name='CareerDetailScreen' component={CareerDetailScreen} options={{ headerShown: false }} />
        </Stack.Group>
    </Stack.Navigator>
  );
}
