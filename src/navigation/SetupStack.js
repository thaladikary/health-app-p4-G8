import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepOne from '../screens/setup/StepOne';
import StepTwo from '../screens/setup/StepTwo';
import StepThree from "../screens/setup/StepThree"
import StepFour from "../screens/setup/StepFour"
import StepFive from "../screens/setup/StepFive"
import StepSix from "../screens/setup/StepSix"
import StepSeven from "../screens/setup/StepSeven"
import CalculateBMR from '../screens/setup/CalculateBMR';
const Stack = createStackNavigator();
export default function SetupStack(){
    return(
        
             <Stack.Navigator  
                    screenOptions={{
                        headerShown: false,
                        header: () => null,
                        contentStyle: { backgroundColor: 'white' },
                        animation:"none",
                        animationEnabled: false
                    }}>
                     
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

<                       Stack.Screen
                            name="StepFour"
                            component={StepFour}
                        />

<                       Stack.Screen
                            name="StepFive"
                            component={StepFive}
                        /> 
                       
                   
                        <Stack.Screen
                            name="StepSix"
                            component={StepSix}
                        /> 

                        <Stack.Screen
                            name="StepSeven"
                            component={StepSeven}
                        />

                         <Stack.Screen
                            name="CalculateBMR"
                            component={CalculateBMR}
                        />
                </Stack.Navigator>
        
    )
}