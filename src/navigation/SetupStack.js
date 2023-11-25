import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepOne from '../screens/setup/StepOne';
import StepTwo from '../screens/setup/StepTwo';
import StepThree from "../screens/setup/StepThree"
import CalculateBMR from '../screens/setup/CalculateBMR';
const Stack = createStackNavigator();
export default function SetupStack(){
    return(
        <NavigationContainer>
             <Stack.Navigator  
                    screenOptions={{
                        headerShown: false,
                        header: () => null,
                        contentStyle: { backgroundColor: 'white' },
                        animation:"none",
                        animationEnabled: false
                    }}>
                         <Stack.Screen
                            name="CalculateBMR"
                            component={CalculateBMR}
                        />
                        <Stack.Screen
                            name="StepOne"
                            component={StepOne}
                        />
                         <Stack.Screen
                            name="StepTwo"
                            component={StepTwo}
                        />
                         <Stack.Screen
                            name="StepThree"
                            component={StepThree}
                        />

                    </Stack.Navigator>
        </NavigationContainer>
    )
}