import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TrackCalories from "../screens/main/TrackCalories";
import Maps from "../screens/main/Maps";
import GroceryList from "../screens/main/GroceryList";
import Account from "../screens/main/Account";
import Scanner from "../screens/main/Scanner";
import FoodDetails from "../screens/main/FoodDetails";
import Add from "../screens/main/Add";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#161213" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          header: () => null,
          contentStyle: { backgroundColor: "white" },
          animation: "none",
          animationEnabled: false,
        }}
      >
        <Stack.Screen name="TrackCalories" component={TrackCalories} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="GroceryList" component={GroceryList} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
