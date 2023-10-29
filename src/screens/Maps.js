import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import Navbar from '../components/Navbar';
export default function Maps ({ navigation }){
    return(
        <View>
           <Text>Maps</Text>
           <Navbar navigation={navigation}/>
        </View>
    )
}