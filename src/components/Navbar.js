import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import NaturalLanguageSearch from "./NaturalLanguageSearch";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const scaleFactor = 0.05;
const marginValue = screenWidth * scaleFactor;
export default function Navbar({ active, navigation }) {
  const [isModalVisible, setModalVisibile] = useState(false);

  const handleTrackCalories = () => {
    navigation.navigate("TrackCalories");
  };
  const handleMaps = () => {
    navigation.navigate("Maps");
  };
  const handleAdd = () => {
    setModalVisibile(!isModalVisible);
  };
  const handleGroceryList = () => {
    navigation.navigate("GroceryList");
  };
  const handleAccount = () => {
    navigation.navigate("UserProfile");
  };

  const setVisibleFromChild = (data) => {
    setModalVisibile(data);
  };

  return (
    <View style={styles.container}>
      {isModalVisible ? (
        <NaturalLanguageSearch
          visible={isModalVisible}
          setVisible={(data) => setVisibleFromChild(data)}
          navigation={navigation}
        />
      ) : (
        <View></View>
      )}
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={handleTrackCalories}>
          <View
            style={[
              styles.labelContainer,
              styles.navText,
              // active === "TrackCalorie" && styles.activeText,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons
                name={
                  active === "TrackCalorie" ? "calendar" : "calendar-outline"
                }
                size={25}
                color={active === "TrackCalorie" ? "#4470e9" : "black"}
              />
            </View>

            <Text style={active === "TrackCalorie" && styles.activeText}>
              Track
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMaps}>
          <View
            style={[
              styles.labelContainer,
              styles.navText,
              // active === "Maps" && styles.activeText,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons
                name={active === "Maps" ? "navigate" : "navigate-outline"}
                size={25}
                color={active === "Maps" ? "#4470e9" : "black"}
              />
            </View>
            <Text style={active === "Maps" && styles.activeText}>Maps</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd}>
          {/* <View style={[styles.plusSign, styles.shadow]}>
            <Text style={styles.plusSignText}>+</Text>
          </View> */}
          <View style={[styles.labelContainer, styles.plusSign, styles.shadow]}>
            <Ionicons name="mic" size={35} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGroceryList}>
          <View
            style={[
              styles.labelContainer,
              styles.navText,
              // active === "Grocery" && styles.activeText,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons
                name={active === "Grocery" ? "cart" : "cart-outline"}
                size={25}
                color={active === "Grocery" ? "#4470e9" : "black"}
              />
            </View>
            <Text style={active === "Grocery" && styles.activeText}>
              Grocery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAccount}>
          <View
            style={[
              styles.labelContainer,
              styles.navText,
              // active === "Profile" && styles.activeText,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons
                name={active === "Profile" ? "person" : "person-outline"}
                size={25}
                color={active === "Profile" ? "#4470e9" : "black"}
              />
            </View>
            <Text style={active === "Profile" && styles.activeText}>
              Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    // marginTop: marginValue,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 0.5,
  },
  labelContainer: {
    margin: 5,
    // marginLeft: 2,
    // width: 60,
    // height: 60,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  navText: {
    color: "black",
    // justifyContent: "center",
    borderTopWidth: 2, // Initial borderBottomWidth
    borderTopColor: "transparent", // Initial borderBottomColor
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    color: "#6495ED",
    borderTopColor: "#6495ED", // Color of the line when the item is active
    // backgroundColor: "#6495ED",
    // padding: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lowerIconText: {},

  icon: {
    // marginLeft: 4,
  },

  plusSign: {
    width: 50,
    height: 50,
    backgroundColor: "#6495ED",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 10,
    // marginLeft: 10,
    // marginTop: 18,
    paddingLeft: 2,
    elevation: 5,
  },
  plusSignText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#4470e9",
  },
  add: {
    marginLeft: 18,
  },

  shadow: {
    elevation: 5,
  },
});
