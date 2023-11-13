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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const scaleFactor = 0.05;
const marginValue = screenWidth * scaleFactor;
export default function Navbar({ navigation }) {
  const handleTrackCalories = () => {
    navigation.navigate("TrackCalories");
  };
  const handleMaps = () => {
    navigation.navigate("Maps");
  };
  const handleAdd = () => {
    navigation.navigate("");
  };

  const handleGroceryList = () => {
    navigation.navigate("GroceryList");
  };
  const handleAccount = () => {
    navigation.navigate("Account");
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={handleTrackCalories}>
        <View style={styles.labelContainer}>
          <Ionicons name="calendar-outline" size={45} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMaps}>
        <View style={styles.labelContainer}>
          <Text>Maps</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAdd}>
        <View style={styles.labelContainer}>
          <Text>+</Text>
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
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    // display:'flex',
    // flexDirection:"row",
    // width:screenWidth,
    // // height:50,
    borderTopColor: "black",
    justifyContent: "space-between",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: marginValue,
  },
  labelContainer: {
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    // borderWidth: 2, // Border width
    // borderColor: "red", // Border color
    // borderRadius: 1,
  },
});
