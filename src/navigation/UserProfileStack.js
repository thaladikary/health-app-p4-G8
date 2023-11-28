import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/main/UserProfile';

const Stack = createStackNavigator();
export default function UserProfileStack(){
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
                            name="UserProfile"
                            component={UserProfile}
                        />
                


            </Stack.Navigator>
        </NavigationContainer>




    )
}
