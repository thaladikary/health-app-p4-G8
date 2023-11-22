import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';
import Navbar from '../../components/Navbar';
const { width, height } = Dimensions.get("window");
export default function Maps ({ navigation }){
    const displayGyms = () => {console.log(552)}
    const displayFood = () => {console.log(552)}
    const displayTrails = () => {console.log(552)}
    const displayOther = () => {console.log(552)}
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={displayGyms}><Text style={styles.buttonText}>Gyms</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={displayFood}><Text style={styles.buttonText}>Food</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={displayTrails}><Text style={styles.buttonText}>Trails</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={displayOther}><Text style={styles.buttonText}>Other</Text></TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} />
                </View>
                <View style={styles.locationContainer}></View>
                <View style={styles.locationContainer}></View>
                <View style={styles.locationContainer}></View>
                <View style={styles.locationContainer}></View>
            </ScrollView>
           <Navbar navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    button:{
        marginVertical: "3%",
        width:"20%",
        borderWidth: 1.5,
        borderRadius: 18,
        backgroundColor:"white",
        shadowColor:"#333333",
        shadowOffset:{
            width:6,
            height:6
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation: 7
    },
    buttonText:{
        fontSize: 22,
        fontWeight: "bold",
        textAlign:"center",
        paddingVertical: "5%"
    },
    mapContainer:{
        borderWidth: 1,
        borderRadius: 15,
        overflow:"hidden",
        width:"90%",
        height: height * 0.55,
        backgroundColor:"white",
        marginHorizontal:width * 0.05,
        shadowColor:"#333333",
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:0.4,
        shadowRadius:4,
        elevation: 4,
        marginVertical:height * 0.01
    },
    locationContainer:{
        width:"86%",
        height: height * 0.08,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor:"white",
        marginHorizontal:width * 0.07,
        marginVertical:height * 0.01,
        shadowColor:"#333333",
        shadowOffset:{
            width:3,
            height:3
        },
        shadowOpacity:0.3,
        shadowRadius:3,
        elevation: 3,
    },
    map: {
        width: '100%',
        height: '100%',
    }
})