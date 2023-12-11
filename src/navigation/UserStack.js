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
import Scanner from "../screens/main/Scanner";
import FoodDetails from "../screens/main/FoodDetails";
import Add from "../screens/main/Add";
import Search from "../screens/main/Search";
import UserProfile from "../screens/main/UserProfile";
import NaturalLanguageSearch from "../components/NaturalLanguageSearch";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    
      
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
        <Stack.Screen
          name="NaturalLanguageSearch"
          component={NaturalLanguageSearch}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="GroceryList" component={GroceryList} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
      </Stack.Navigator>
   
  );
}
