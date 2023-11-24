import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';
import Stars from 'react-native-stars';
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
                <View style={styles.locationContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.locationInfoName}>
                            <Text  style={styles.locationInfoNameText}>Dinny's Diner</Text>
                        </View>
                        <View style={styles.locationInfoRating}>
                            <Text style={styles.locationInfoRatingText}>4.6 <Stars
                            half={true}
                            default={3.5}
                            spacing={4}
                            starSize={12}
                            count={5}
                            fullStar={require("../../assets/full-star.png")}
                            emptyStar={require("../../assets/empty-star.png")}
                            halfStar={require("../../assets/half-star.png")}/> (27)</Text>
                        </View>
                        <View style={styles.locationInfoAddress}>
                            <Text style={styles.locationInfoAddressText}>Restaurant · 1715 27 Ave NE #4</Text>
                        </View>
                    </View>
                    <View style={styles.locationButtons}>
                        <TouchableOpacity style={styles.locationButtonsDirection}>
                            <Image style={styles.directionsImg} source={require('../../assets/direction-icon.png')}></Image>
                            <Text style={styles.directionsImgText}>Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.locationInfoName}>
                            <Text  style={styles.locationInfoNameText}>Yaseen's Shawrama</Text>
                        </View>
                        <View style={styles.locationInfoRating}>
                            <Text style={styles.locationInfoRatingText}>5.0 <Stars
                            half={true}
                            default={5}
                            spacing={4}
                            starSize={12}
                            count={5}
                            fullStar={require("../../assets/full-star.png")}
                            emptyStar={require("../../assets/empty-star.png")}
                            halfStar={require("../../assets/half-star.png")}/> (242)</Text>
                        </View>
                        <View style={styles.locationInfoAddress}>
                            <Text style={styles.locationInfoAddressText}>Restaurant · 1611 Rouleau Cres SE</Text>
                        </View>
                    </View>
                    <View style={styles.locationButtons}>
                        <TouchableOpacity style={styles.locationButtonsDirection}>
                            <Image style={styles.directionsImg} source={require('../../assets/direction-icon.png')}></Image>
                            <Text style={styles.directionsImgText}>Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.locationInfoName}>
                            <Text  style={styles.locationInfoNameText}>Thals Borgers</Text>
                        </View>
                        <View style={styles.locationInfoRating}>
                            <Text style={styles.locationInfoRatingText}>1.2 <Stars
                            half={true}
                            default={1.2}
                            spacing={4}
                            starSize={12}
                            count={5}
                            fullStar={require("../../assets/full-star.png")}
                            emptyStar={require("../../assets/empty-star.png")}
                            halfStar={require("../../assets/half-star.png")}/> (27)</Text>
                        </View>
                        <View style={styles.locationInfoAddress}>
                            <Text style={styles.locationInfoAddressText}>Restaurant · 5126 52 St SW #1</Text>
                        </View>
                    </View>
                    <View style={styles.locationButtons}>
                        <TouchableOpacity style={styles.locationButtonsDirection}>
                            <Image style={styles.directionsImg} source={require('../../assets/direction-icon.png')}></Image>
                            <Text style={styles.directionsImgText}>Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.locationInfoName}>
                            <Text  style={styles.locationInfoNameText}>Mikes Halal Steak</Text>
                        </View>
                        <View style={styles.locationInfoRating}>
                            <Text style={styles.locationInfoRatingText}>3.9 <Stars
                            half={true}
                            default={3.9}
                            spacing={4}
                            starSize={12}
                            count={5}
                            fullStar={require("../../assets/full-star.png")}
                            emptyStar={require("../../assets/empty-star.png")}
                            halfStar={require("../../assets/half-star.png")}/> (15)</Text>
                        </View>
                        <View style={styles.locationInfoAddress}>
                            <Text style={styles.locationInfoAddressText}>Steakhouse · 1715 27 Ave NE #4</Text>
                        </View>
                    </View>
                    <View style={styles.locationButtons}>
                        <TouchableOpacity style={styles.locationButtonsDirection}>
                            <Image style={styles.directionsImg} source={require('../../assets/direction-icon.png')}></Image>
                            <Text style={styles.directionsImgText}>Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        flexDirection: "row",
        overflow: "hidden"
    },
    map: {
        width: '100%',
        height: '100%',
    },
    locationInfo: {
        flex: 3.2,
        paddingLeft: "3%",
        flexDirection: "column"
    }, 
    locationInfoNameText: {
        fontWeight: "500",
        fontSize: 15
    },
    locationInfoName: {
        
    },
    locationInfoRating: {
        flexDirection:"row"
    },
    locationInfoRatingText: {
        color: "#595959"
    },
    locationInfoAddressText:{
        color: "#595959"
    }, directionsImg:{
        width: 32,
        height: 32
    }, 
    locationButtons: {
        flex: 1,
        display: "flex",
        justifyContent:"center",
        
    },
    locationButtonsDirection:{
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center"
    }, directionsImgText: {
        fontSize: 12,
        color: "#1FA5DE"
    }
})