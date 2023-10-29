import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import Navbar from '../components/Navbar';
export default function TrackCalories({navigation}){
   return(
    <View>
        <Text>TrackCalories Page!</Text>
        <Navbar navigation={navigation}/>
    </View>
   )
}