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
        <View style={styles.navbarContainer}>
            <TouchableOpacity onPress={handleTrackCalories}>
              <View style={styles.labelContainer}>
                <Text>Track Calories</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMaps}>
            <View style={styles.labelContainer}>
                <Text>Maps</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGroceryList}>
            <View style={styles.labelContainer}>
                <Text>Grocery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAccount}>
            <View style={styles.labelContainer}>
                <Text>Profile</Text>
              </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer:{
        display:'flex',
        flexDirection:"row",
        // width:360,
        // height:50,
        borderTopColor:"black",
        borderTopWidth:1
     

    },
    labelContainer:{
        alignContent:"space-between",
        margin:10,
        marginTop:15,
        marginBottom:15,
        marginLeft:20
    }
})