import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import Navbar from '../components/Navbar';
export default function Account ({ navigation }){
    return(
        <View>
           <Text>Account</Text>
           <Navbar navigation={navigation}/>
        </View>
    )
}