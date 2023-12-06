import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, ScrollView, Button, State} from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';


import Stars from 'react-native-stars';
import createMapLink from 'react-native-open-maps';
import * as Location from 'expo-location';
import Navbar from '../../components/Navbar';
import { GOOGLE_API_KEY } from "@env";
const { width, height } = Dimensions.get("window");

export default function Maps ({ navigation }) {
    const [loc, setLoc] = useState({coords: {latitude: 38.4226711, longitude: -116.0849872}})
    const [cards, setCards] = useState()
    const [markers, setMarkers] = useState()

    useEffect(() => {
        const getPermissions = async () => {
        await Location.requestForegroundPermissionsAsync()
        let currentLocation = await Location.getLastKnownPositionAsync({})
        setLoc(currentLocation)
        console.log(currentLocation)
        currentLocation = await Location.getCurrentPositionAsync({})
        setLoc(currentLocation)
        console.log(currentLocation)
        }
        getPermissions()
        displayFood()
      }, []);

      async function displayFood() {
            let request = await fetch("https://places.googleapis.com/v1/places:searchText", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,
                    "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id"
                },
                body: JSON.stringify(
                    {
                        "textQuery" : "healthy restaurants",
                        "maxResultCount": 7,
                        "locationBias": {
                          "circle": {
                            "center": {
                              "latitude": loc.coords.latitude,
                              "longitude": loc.coords.longitude},
                            "radius": 2000.0
                          }
                        }
                    }
                )})
            responce = await request.json()
            setCards(buildCards(responce))
        }
        
    async function displayGyms() {
        let request = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_API_KEY,
                "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id"
            },
            body: JSON.stringify(
                {
                    "includedTypes": ["gym"],
                    "maxResultCount": 10,
                    "locationRestriction": {
                      "circle": {
                        "center": {
                            "latitude": loc.coords.latitude,
                            "longitude": loc.coords.longitude},
                        "radius": 2000.0
                      }
                    }
                }
            )})
        responce = await request.json()
        setCards(buildCards(responce))
    }

    async function displayRecreation() {
        let request = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_API_KEY,
                "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id"
            },
            body: JSON.stringify(
                {
                    "includedTypes": ["swimming_pool","ski_resort","sports_club","sports_complex","athletic_field"],
                    "maxResultCount": 10,
                    "locationRestriction": {
                      "circle": {
                        "center": {
                            "latitude": loc.coords.latitude,
                            "longitude": loc.coords.longitude},
                        "radius": 2000.0
                      }
                    }
                }
            )})
        responce = await request.json()
        setCards(buildCards(responce))
    }

    function buildCards(data) {
        filteredPlaces = data.places.filter( place => place.userRatingCount > 10)
        cardList=[]
        markerList=[]
        
        filteredPlaces.forEach((locInfo) => {
            console.log(locInfo)
            markerList.push(
                <Marker
                      key={locInfo.id}
                      coordinate={{"latitude": locInfo.location.latitude,"longitude": locInfo.location.longitude}}
                      title={locInfo.displayName.text}
                      description={locInfo.primaryTypeDisplayName != undefined ? locInfo.primaryTypeDisplayName.text : ""}
                    />
            )
            cardList.push(
                <View style={styles.locationContainer}>
                    <View style={styles.locationInfo}>
                        <View style={styles.locationInfoName}>
                            <Text  style={styles.locationInfoNameText}>{locInfo.displayName.text}</Text>
                        </View>
                        <View style={styles.locationInfoRating}>
                            <Text style={styles.locationInfoRatingText}>{locInfo.rating} <Stars
                            half={true}
                            default={locInfo.rating}
                            spacing={4}
                            starSize={12}
                            count={5}
                            fullStar={require("../../assets/full-star.png")}
                            emptyStar={require("../../assets/empty-star.png")}
                            halfStar={require("../../assets/half-star.png")}/> ({locInfo.userRatingCount})</Text>
                        </View>
                        <View style={styles.locationInfoAddress}>
                            <Text style={styles.locationInfoAddressText}>{locInfo.primaryTypeDisplayName != undefined ? locInfo.primaryTypeDisplayName.text : ""} · {locInfo.shortFormattedAddress.replace(', Calgary','')}</Text>
                        </View>
                    </View>
                    <View style={styles.locationButtons}>
                        <TouchableOpacity style={styles.locationButtonsDirection} onPress={() => createMapLink({end:`${locInfo.displayName.text}`, latitude: locInfo.location.latitude, longitude: locInfo.location.longitude })}>
                            <Image style={styles.directionsImg} source={require('../../assets/direction-icon.png')}></Image>
                            <Text style={styles.directionsImgText}>Direction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
        console.log(markerList)
        setMarkers(markerList)
        return cardList
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={displayGyms}><Text style={styles.buttonText}>Gyms</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={displayRecreation}><Text style={styles.buttonText}>Recreation</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={displayFood}><Text style={styles.buttonText}>Food</Text></TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} showsUserLocation={true}
                     region={{
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.0522,
                        longitudeDelta: 0.0321,
                      }}>
                        {markers}
                    </MapView>
                </View>
                {cards}
            </ScrollView>
           <Navbar navigation={navigation} active = "Maps"/>
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
        display: "flex"
    },
    button:{
        marginVertical: "3%",
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
        elevation: 7,
    },
    buttonText:{
        fontSize: 22,
        fontWeight: "bold",
        textAlign:"center",
        paddingHorizontal: "2.2%",
        paddingVertical: "2%"
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
        minHeight: height * 0.08,
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