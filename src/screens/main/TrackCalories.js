import { View, Text, StyleSheet,Image, Dimensions, StatusBar} from 'react-native';
import Navbar from '../../components/Navbar';
export default function TrackCalories({navigation}){
   return(
    <View>
        <Text>Track Calories Page</Text>
        <Navbar navigation={navigation}/>
    </View>
   )
}
