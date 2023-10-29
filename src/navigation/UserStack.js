import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import TrackCalories from "../screens/TrackCalories"
import Maps from '../screens/Maps';
import GroceryList from "../screens/GroceryList"
import Account from '../screens/Account';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function UserStack(){
    return(
        <NavigationContainer>
              <StatusBar
                    backgroundColor="#161213"
                    barStyle="light-content"
                />
                <Stack.Navigator  
                    screenOptions={{
                        headerShown: false,
                        header: () => null,
                        contentStyle: { backgroundColor: 'white' },
                        animation:"none",
                        animationEnabled: false
                    }}>

                        <Stack.Screen
                            name="TrackCalories"
                            component={TrackCalories}
                        />
                        <Stack.Screen
                            name="Maps"
                            component={Maps}
                        />
                         <Stack.Screen
                            name="GroceryList"
                            component={GroceryList}
                        />
                        <Stack.Screen
                            name="Account"
                            component={Account}
                        />
                </Stack.Navigator>
        </NavigationContainer>
    )
}