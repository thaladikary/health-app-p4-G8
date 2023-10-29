import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';


export default function Navbar({ navigation }){

    const handleTrackCalories = () =>{
        navigation.navigate("TrackCalories")
    }
    const handleMaps = ()=>{
        navigation.navigate("Maps")
    }
    const handleGroceryList = ()=>{
        navigation.navigate("GroceryList")
    }
    const handleAccount = ()=>{
        navigation.navigate("Account")
    }
    return(
        <View>
            <TouchableOpacity onPress={handleTrackCalories}>
              <Text>Track Calories</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMaps}>
                <Text>Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGroceryList}>
                 <Text>Groceries List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAccount}>
                 <Text>Account</Text>
            </TouchableOpacity>
        </View>
    )
}