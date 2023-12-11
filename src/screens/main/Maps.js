import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Button,
  State,
} from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import Stars from "react-native-stars";
import createMapLink from "react-native-open-maps";
import * as Location from "expo-location";
import Navbar from "../../components/Navbar";
import { GOOGLE_API_KEY } from "@env";
const { width, height } = Dimensions.get("window");

export default function Maps({ navigation }) {
  const [loc, setLoc] = useState({
    coords: { latitude: 38.4226711, longitude: -116.0849872 },
  });
  const [cards, setCards] = useState();
  const [markers, setMarkers] = useState();
  const [selected, setSelected] = useState("Food");
  const [distance, setDistance] = useState(2);

  

  useEffect( () => {
    const getPermissions = async () => {
      await Location.requestForegroundPermissionsAsync();
      let currentLocation = await Location.getLastKnownPositionAsync({}); // quickly gets the location so everything loads fast
      setLoc(currentLocation);
      currentLocation = await Location.getCurrentPositionAsync({}); // accuratly gets the location with a small dely
      setLoc(currentLocation);
    };
    getPermissions()
    displayFood()
  }, []);

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  async function displayFood(overrideDistance) {
    let dist = distance
    if (Number.isInteger(overrideDistance)) {
      dist = overrideDistance
    }

    let request = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id",
        },
        body: JSON.stringify({
          textQuery: "healthy restaurants",
          maxResultCount: 10,
          locationRestriction: {
            rectangle: {
              low: {
                latitude: (loc.coords.latitude - ((1 / 112) * dist)),
                longitude: (loc.coords.longitude - ((1 / 112) * dist)),
              },
              high: {
                latitude: (loc.coords.latitude  + ((1 / 112) * dist)),
                longitude: (loc.coords.longitude  + ((1 / 112) * dist)),
              }
            },
          },
        }),
      }
    );
    responce = await request.json();
    setCards(buildCards(responce));
    setSelected("Food")
  }

  async function displayGyms(overrideDistance) {
    let dist = distance
    if (Number.isInteger(overrideDistance)) {
      dist = overrideDistance
    }
      let response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id",
          },
          body: JSON.stringify({
            includedTypes: ["gym"],
            maxResultCount: 10,
            locationRestriction: {
              circle: {
                center: {
                  latitude: loc.coords.latitude,
                  longitude: loc.coords.longitude,
                },
                radius: (dist * 1000),
              },
            },
          }), 
        }
      );
      response = await response.json();
      setCards(buildCards(response));
      setSelected("Gyms")   
  }

  async function displayRecreation(overrideDistance) {
    //setLoc({coords: { latitude: loc.coords.latitude + 0.000000001, longitude: loc.coords.longitude }})
    let dist = distance
    if (Number.isInteger(overrideDistance)) {
      dist = overrideDistance
    }
    
    let request = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.rating,places.userRatingCount,places.location,places.primaryTypeDisplayName,places.shortFormattedAddress,places.id",
        },
        body: JSON.stringify({
          includedTypes: [
            "swimming_pool",
            "ski_resort",
            "sports_club",
            "sports_complex",
            "athletic_field",
          ],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              },
              radius: (dist * 1000),
            },
          },
        }),
      }
    );
    responce = await request.json();
    setCards(buildCards(responce));
    setSelected("Recreation")
  }

  function buildCards(data) {
    filteredPlaces = data.places.filter((place) => place.userRatingCount > 10);
    cardList = [];
    markerList = [];

    filteredPlaces.forEach((locInfo) => {
      markerList.push(
        <Marker
          key={locInfo.id}
          coordinate={{
            latitude: locInfo.location.latitude,
            longitude: locInfo.location.longitude,
          }}
          title={locInfo.displayName.text}
          description={
            locInfo.primaryTypeDisplayName != undefined
              ? locInfo.primaryTypeDisplayName.text
              : ""
          }
        />
      );
      cardList.push(
        <View style={styles.locationContainer}>
          <View style={styles.locationInfo}>
            <View style={styles.locationInfoName}>
              <Text style={styles.locationInfoNameText}>
                {locInfo.displayName.text}
              </Text>
            </View>
            <View style={styles.locationInfoRating}>
              <Text style={styles.locationInfoRatingText}>
                {locInfo.rating}{" "}
                <Stars
                  half={true}
                  default={locInfo.rating}
                  spacing={4}
                  starSize={12}
                  count={5}
                  fullStar={require("../../assets/full-star.png")}
                  emptyStar={require("../../assets/empty-star.png")}
                  halfStar={require("../../assets/half-star.png")}
                />{" "}
                ({locInfo.userRatingCount})
              </Text>
            </View>
            <View style={styles.locationInfoAddress}>
              <Text style={styles.locationInfoAddressText}>
                {locInfo.primaryTypeDisplayName != undefined
                  ? locInfo.primaryTypeDisplayName.text
                  : ""}{" "}
                · {locInfo.shortFormattedAddress.replace(", Calgary", "")}
              </Text>
            </View>
          </View>
          <View style={styles.locationButtons}>
            <TouchableOpacity
              style={styles.locationButtonsDirection}
              onPress={() =>
                createMapLink({
                  end: `${locInfo.displayName.text}`,
                  latitude: locInfo.location.latitude,
                  longitude: locInfo.location.longitude,
                })
              }
            >
              <Image
                style={styles.directionsImg}
                source={require("../../assets/direction-icon.png")}
              ></Image>
              <Text style={styles.directionsImgText}>Direction</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    setMarkers(markerList);
    return cardList;
  }

  function displayDistance2() {
    setDistance(2)
    rerenderMap(2)
  }

  function displayDistance4() {
    setDistance(4)
    rerenderMap(4)
  }

  function displayDistance6() {
    setDistance(6)
    rerenderMap(6)
  }
  
  function rerenderMap(num) {
    switch(selected){
      case "Food":
      displayFood(num)
      break
      case "Recreation":
      displayRecreation(num)
      break
      case "Gyms":
      displayGyms(num)
      break
    }

  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            region={{
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0321,
            }}
          >
            {markers}
          </MapView>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, selected == "Gyms" ? styles.buttonSelected : styles.nothing]} onPress={displayGyms}>
            <Text style={[styles.buttonText, selected == "Gyms" ? styles.buttonTextSelected : styles.nothing]}>Gyms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, selected == "Recreation" ? styles.buttonSelected : styles.nothing]} onPress={displayRecreation}>
            <Text style={[styles.buttonText, selected == "Recreation" ? styles.buttonTextSelected : styles.nothing]}>Recreation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, selected == "Food" ? styles.buttonSelected : styles.nothing]} onPress={displayFood}>
            <Text style={[styles.buttonText, selected == "Food" ? styles.buttonTextSelected : styles.nothing]}>Food</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.distanceButtons}>
          <TouchableOpacity style={[styles.distanceButton, distance == 2 ? styles.buttonSelected : styles.nothing]} onPress={displayDistance2}>
            <Text style={[styles.buttonText, distance == 2 ? styles.buttonTextSelected : styles.nothing]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceButton, distance == 4 ? styles.buttonSelected : styles.nothing]} onPress={displayDistance4}>
            <Text style={[styles.buttonText, distance == 4 ? styles.buttonTextSelected : styles.nothing]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceButton, distance == 6 ? styles.buttonSelected : styles.nothing]} onPress={displayDistance6}>
            <Text style={[styles.buttonText, distance == 6 ? styles.buttonTextSelected : styles.nothing]}>6</Text>
          </TouchableOpacity>
        </View>
        {cards}
      </ScrollView>
      <Navbar navigation={navigation} active="Maps" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    display: "flex",
    position:"absolute",
    width:"90%"
  },
  button: {
    marginVertical: "4%",
    borderWidth: 0.2,
    borderRadius: 0,
    backgroundColor: "#eeeeee",
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 7,
    opacity: 0.7
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: "2.2%",
    paddingVertical: "1%",
  },
  buttonTextSelected: {
    color: "#1d86de"
  },
  buttonSelected: {
    backgroundColor: "#ffffff",
    opacity: 0.8
  },
  mapContainer: {
    borderWidth: 0.4,
    overflow: "hidden",
    width: "100%",
    height: height * 0.65,
    backgroundColor: "white",
    shadowColor: "#333333",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
    marginBottom: height * 0.009,
  },
  locationContainer: {
    width: "86%",
    minHeight: height * 0.08,
    borderRadius: 15,
    backgroundColor: "white",
    marginHorizontal: width * 0.07,
    marginVertical: height * 0.012,
    paddingVertical: height * 0.008,
    shadowColor: "#333333",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    flexDirection: "row",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  locationInfo: {
    flex: 3.2,
    paddingLeft: "3%",
    flexDirection: "column",
  },
  locationInfoNameText: {
    fontWeight: "500",
    fontSize: 15,
  },
  locationInfoName: {},
  locationInfoRating: {
    flexDirection: "row",
  },
  locationInfoRatingText: {
    color: "#595959",
  },
  locationInfoAddressText: {
    color: "#595959",
  },
  directionsImg: {
    width: 32,
    height: 32,
  },
  locationButtons: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  locationButtonsDirection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  directionsImgText: {
    fontSize: 12,
    color: "#1FA5DE",
  },
  distanceButtons: {
    position:"absolute",
    width:"10%",
    right:(width * 0.027),
    top: (height * 0.075),
    flexDirection:"column",
    justifyContent: "space-evenly",
    display: "flex",
  },
  distanceButton:{
    marginVertical: "14%",
    borderWidth: 0.2,
    borderRadius: 0,
    backgroundColor: "#eeeeee",
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 7,
    opacity: 0.7
  }, nothing: {

  }
});
