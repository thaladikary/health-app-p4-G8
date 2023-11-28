import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import FirstPage from '../screens/auth/FirstPage';
import Register from '../screens/auth/Register';

const Stack = createStackNavigator();
export default function LoginRegisterStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    header: () => null,
                    contentStyle: { backgroundColor: 'white' },
                    animation:"none",
                    animationEnabled: false

                }}
            >
                <Stack.Screen
                            name="FirstPage"
                            component={FirstPage}
                        />
                <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                <Stack.Screen
                            name="Register"
                            component={Register}
                />


            </Stack.Navigator>
        </NavigationContainer>




    )
}