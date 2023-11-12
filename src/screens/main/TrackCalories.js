import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import Navbar from "../../components/Navbar";

const { width, height } = Dimensions.get("window");
export default function TrackCalories({ navigation }) {
  const [kcalprogress, setKcalProgress] = useState(0);
  const [carbsProgress, setCarbsProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [fatsProgress, setFatsProgress] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
       
        <Text style={styles.header}>Track Calories </Text>

        {/* KCAL TRACKER */}
        <View style={[styles.mainTrackerContainer]}>
          <View style={[styles.card]}>
            <View style={[styles.consumedContainer]}>
              <View style={styles.consumedStyles}>
                <Text style={[styles.consumedHeader]}>Consumed</Text>
                <Text style={styles.consumedAmount}>
                  <Text style={styles.boldText}>990</Text>
                  <Text> kcals</Text>
                </Text>
              </View>
              <View style={[styles.progressSection]}>
                <View>
                  <Progress.Circle
                    size={125}
                    thickness={7}
                    progress={0.6}
                    showsText
                    allowFontScaling
                    unfilledColor="lightgray"
                    strokeCap="round"
                    borderWidth={0}
                    formatText={() => (
                      <Text style={styles.progressContainer}>
                        <Text style={styles.progressAmtTextStyle}>2180</Text>
                        {"\n"}
                        <Text style={styles.progressTextStyle}>remaining</Text>
                      </Text>
                    )}
                    // textStyle={styles.progressAmtTextStyle}
                    alignText="center"
                    color="#6495ED"
                  />
                </View>
              </View>
            </View>

            {/* MACROS TRACKER */}
            <View style={styles.macroTrackerContainer}>
              <View style={[styles.carbTrackerContainer]}>
                <Text style={[styles.macroHeaderStyle, styles.flexStyle]}>
                  Carbs
                </Text>
                <Progress.Bar
                  progress={0.5}
                  width={100}
                  height={7}
                  color="#87cefa"
                  unfilledColor="lightgray"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>50%</Text>
              </View>

              <View style={[styles.proteinTrackerContainer]}>
                <Text style={[styles.macroHeaderStyle, styles.flexStyle]}>
                  Protein
                </Text>
                <Progress.Bar
                  progress={0.8}
                  width={100}
                  height={7}
                  color="#cd5c5c"
                  unfilledColor="lightgray"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>80%</Text>
              </View>

              <View style={[styles.fatsTrackerContainer]}>
                <Text style={[styles.macroHeaderStyle, styles.flexStyle]}>
                  Fats
                </Text>
                <Progress.Bar
                  progress={0.3}
                  width={100}
                  height={7}
                  color="#daa520"
                  unfilledColor="lightgray"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>30%</Text>
              </View>
            </View>
          </View>

          {/* WATER TRACKER */}
          <View style={[styles.card, styles.waterTrackContainer]}>
            <Text style={[styles.waterTrackHeader]}>Water Tracker</Text>
            <View>
              <Progress.Bar
                progress={0.3}
                width={width - 100}
                height={25}
                color="#00bfff"
                unfilledColor="lightgray"
                borderWidth={0}
              />
              <Text style={[styles.waterTrackAmountHeader]}>
                <Text>Goal: </Text>
                <Text style={[styles.waterTrackAmount]}>755/2500</Text>
                <Text> mL</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.card]}>
            <Text style={[styles.weightTrackHeader]}>Weight Tracker</Text>
            <Text>There should be a graph here...</Text>
          </View>
        </View>
       
      </ScrollView>
      <Navbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header: {
    fontSize: 25,
    marginTop: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },
  mainTrackerContainer: {
    display: "flex",
    flexDirection: "column",
  },

  card: {
    height: 250,
    margin: 15,
    paddingTop: 25,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
  },

  consumedContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  consumedStyles: {
    width: 150,
    height: 100,
    // borderWidth: 2, // Border width
    // borderColor: "blue", // Border color
    // borderRadius: 0, // Border radius (optional)
  },

  consumedHeader: {
    color: "darkgray",
    marginLeft: 30,
    fontWeight: "500",
    marginTop: 25,
    fontSize: 20,
  },

  consumedAmount: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: 30,
  },

  progressSection: {
    width: 150,
    height: 100,
    // borderWidth: 2, // Border width
    // borderColor: "blue", // Border color
    // borderRadius: 0, // Border radius (optional)
    marginRight: 1,
  },

  progressAmtTextStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginLeft: 25,
  },

  progressTextStyle: {
    fontSize: 13,
    color: "darkgray",
    fontWeight: "500",
  },
  progressTextMacros: {
    textAlign: "center",
  },

  macroTrackerContainer: {
    width: "100%",
    height: 75,
    // borderWidth: 2, // Border width
    // borderColor: "blue", // Border color
    // borderRadius: 0, // Border radius (optional)
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  macroHeaderStyle: {
    color: "darkgray",
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  flexStyle: {
    display: "flex",
  },
  carbTrackerContainer: {},
  proteinTrackerContainer: {},
  fatsTrackerContainer: {},

  waterTrackContainer: {
    height: 125,
    alignItems: "center",
  },

  waterTrackAmount: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },

  waterTrackAmountHeader: {
    textAlign: "center",
    margin: 5,
  },

  waterTrackHeader: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 5,
  },

  weightTrackHeader: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
