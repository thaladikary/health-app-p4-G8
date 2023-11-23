import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/auth/LoginPage';
const Stack = createStackNavigator();
export default function UserStack() {
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
               animation:"none"
               
             }}>
            <Stack.Screen
                name="Login"
                component={LoginPage}
             />   
         {/* <Stack.Screen
           name="Signup"
           component={Signup}
         />      */}

        </Stack.Navigator>
     </NavigationContainer>

    )
}