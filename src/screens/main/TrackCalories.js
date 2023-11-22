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
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
export default function TrackCalories({ navigation, route }) {
  const [kcalprogress, setKcalProgress] = useState(0);
  const [carbsProgress, setCarbsProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [fatsProgress, setFatsProgress] = useState(0);
  const [foodDiaryList, setFoodDiaryList] = useState([]);
  useEffect(() => {
    route.params
      ? setFoodDiaryList((prevList) => [...prevList, route.params.prop])
      : console.log("none");
  }, [route.params]);
  useEffect(() => {
    console.log(foodDiaryList[0]);
  }, [foodDiaryList]);
  const handleSearchMeal = (mealType) => {
    navigation.navigate("Add", { mealType });
  };

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
                  width={width * 0.23}
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
                  width={width * 0.23}
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
                  width={width * 0.23}
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

          <View
            style={[
              styles.card,
              styles.mealCard,
              foodDiaryList.some((item) => item.mealType === "breakfast") &&
                styles.listExistsStyle,
            ]}
          >
            <View style={styles.mealContainer}>
              <View style={styles.mealFontContainer}>
                <Text style={styles.mealFontText}>Breakfast</Text>
              </View>
              <TouchableOpacity onPress={() => handleSearchMeal("breakfast")}>
                <View style={styles.plusSign}>
                  <Text style={styles.plusSignText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {foodDiaryList.length > 0 &&
            foodDiaryList.map((item) => {
              if (item.mealType === "breakfast") {
                return (
                  <View style={styles.expandedCard}>
                    <View style={styles.foodNameContainer}>
                      <Text>{item.name}</Text>
                    </View>

                    <Text>{item.macros.calories}</Text>
                  </View>
                );
              }
            })}

          <View
            style={[
              styles.card,
              styles.mealCard,
              foodDiaryList.some((item) => item.mealType === "lunch") &&
                styles.listExistsStyle,
            ]}
          >
            <View style={styles.mealContainer}>
              <View style={styles.mealFontContainer}>
                <Text style={styles.mealFontText}>Lunch</Text>
              </View>
              <TouchableOpacity onPress={() => handleSearchMeal("lunch")}>
                <View style={styles.plusSign}>
                  <Text style={styles.plusSignText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {foodDiaryList.length > 0 &&
            foodDiaryList.map((item) => {
              if (item.mealType === "lunch") {
                return (
                  <View style={styles.expandedCard}>
                    <View style={styles.foodNameContainer}>
                      <Text>{item.name}</Text>
                    </View>

                    <Text>{item.macros.calories}</Text>
                  </View>
                );
              }
            })}
          <View
            style={[
              styles.card,
              styles.mealCard,
              foodDiaryList.some((item) => item.mealType === "dinner") &&
                styles.listExistsStyle,
            ]}
          >
            <View style={styles.mealContainer}>
              <View style={styles.mealFontContainer}>
                <Text style={styles.mealFontText}>Dinner</Text>
              </View>
              <TouchableOpacity onPress={() => handleSearchMeal("dinner")}>
                <View style={styles.plusSign}>
                  <Text style={styles.plusSignText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {foodDiaryList.length > 0 &&
            foodDiaryList.map((item) => {
              if (item.mealType === "dinner") {
                return (
                  <View style={styles.expandedCard}>
                    <View style={styles.foodNameContainer}>
                      <Text>{item.name}</Text>
                    </View>

                    <Text>{item.macros.calories}</Text>
                  </View>
                );
              }
            })}
          <View
            style={[
              styles.card,
              styles.mealCard,
              foodDiaryList.some((item) => item.mealType === "snacks") &&
                styles.listExistsStyle,
            ]}
          >
            <View style={styles.mealContainer}>
              <View style={styles.mealFontContainer}>
                <Text style={styles.mealFontText}>Snacks</Text>
              </View>
              <TouchableOpacity onPress={() => handleSearchMeal("snacks")}>
                <View style={styles.plusSign}>
                  <Text style={styles.plusSignText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {foodDiaryList.length > 0 &&
            foodDiaryList.map((item) => {
              if (item.mealType === "snacks") {
                return (
                  <View style={styles.expandedCard}>
                    <View style={styles.foodNameContainer}>
                      <Text>{item.name}</Text>
                    </View>

                    <Text>{item.macros.calories}</Text>
                  </View>
                );
              }
            })}
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
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 18,
    fontWeight: "bold",
  },
  mainTrackerContainer: {
    display: "flex",
    flexDirection: "column",
  },

  card: {
    height: "auto",
    margin: 15,
    marginBottom: 1,
    paddingTop: 20,
    backgroundColor: "white",
    borderRadius: 12,
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
    height: 97,
    alignItems: "center",
    paddingTop: 10,
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
    fontSize: 23,
  },
  plusSignText: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#4470e9",
  },
  mealFontText: {
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 20,
  },

  mealCard: {
    height: 84,
    paddingTop: 12,
  },
  listExistsStyle: {
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },
  mealContainer: {
    display: "flex",
    flexDirection: "row",
  },
  plusSign: {
    width: 50,
    height: 50,
    backgroundColor: "#eaf4fe",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  mealFontContainer: {
    width: width * 0.74,
  },
  expandedCard: {
    height: "auto",
    flexDirection: "row",
    width: width * 0.915,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    marginLeft: 15,
    backgroundColor: "white",
    paddingLeft: 20,
    padding: 15,
    elevation: 5,
  },
  foodNameContainer: {
    width: width * 0.74,
  },
});
