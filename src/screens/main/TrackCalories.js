import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Progress from "react-native-progress";
import Navbar from "../../components/Navbar";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useUser } from "../../context/userContext";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../../config/firebase";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
export default function TrackCalories({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const swipeableRef = useRef(null);
  const [progress, setProgress] = useState({
    kcal: 0,
    carbs: 0,
    protein: 0,
    fats: 0,
  });
  const [goals, setGoals] = useState({
    caloriesGoal: 2500,
    carbsGoal: 500,
    proteinGoal: 150,
    fatGoal: 100,
  });
  const [foodDiaryList, setFoodDiaryList] = useState([]);
  const user = useUser();
  const userId = user.uid;
  // useEffect(()=>{
  //   route.params ? setFoodDiaryList((prevList) => [...prevList, route.params.prop]) : console.log("none")

  // },[route.params ])
  // useEffect(()=>{

  //   console.log(foodDiaryList[0])
  // },[foodDiaryList])

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  // const formattedDate = currentDate.toLocaleDateString("en-US", {
  //   weekday: "short",
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // });

  const formattedDate =
    currentDate.getTime() === new Date().getTime()
      ? "Today"
      : currentDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

  const getCurrentDate = () => {
    const today = currentDate;
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "userInfo")
        );
        querySnapshot.forEach((doc) => {
          try {
            const data = doc.data();
            setGoals({
              caloriesGoal: data.caloriesIntake,
              carbsGoal: data.carbIntake,
              proteinGoal: data.proteinIntake,
              fatGoal: data.fatIntake,
            });
            // console.log(retArray[0]);
          } catch (e) {
            console.log("not workin");
          }
        });
      } catch (error) {
        console.error("Error retrieving document: ", error);
      }
    };

    fetchData();
  }, []); // Add dependencies if needed
  const calculateTotals = (meals) => {
    let totals = {
      kcal: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
    };

    meals.forEach((meal) => {
      totals.kcal += meal.prop.nutriments.calories;
      totals.carbs += meal.prop.nutriments.carbohydrates;
      totals.protein += meal.prop.nutriments.protein;
      totals.fats += meal.prop.nutriments.fat;
    });

    return totals;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const date = getCurrentDate();
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "foodDiaries", date, "entries")
        );
        const retArray = [];
        querySnapshot.forEach((doc) => {
          try {
            // console.log("DOCDATA",doc.id)
            const dataWithId = {
              id: doc.id,
              ...doc.data(),
            };
            // console.log(dataWithId)
            retArray.push(dataWithId);
            // console.log(retArray[0]);
          } catch (e) {
            console.log("not workin");
          }
        });
        const initializeProgressState = () => {
          return {
            kcal: 0,
            carbs: 0,
            protein: 0,
            fats: 0,
          };
        };
        const calculateTotals = (progressState, meal) => {
          progressState.kcal += meal.prop.nutriments.calories;
          progressState.carbs += meal.prop.nutriments.carbohydrates;
          progressState.protein += meal.prop.nutriments.protein;
          progressState.fats += meal.prop.nutriments.fat;
          return progressState;
        };

        let totals = initializeProgressState();
        retArray.forEach((meal) => {
          console.log(meal);
          totals = calculateTotals(totals, meal);
        });
        console.log("TOTAL", totals);
        setProgress(totals);
        setFoodDiaryList(retArray);
      } catch (error) {
        console.error("Error retrieving document: ", error);
      }
    }
    fetchData();
  }, [route.params, currentDate]);
  const handleSearchMeal = (mealType) => {
    navigation.navigate("Add", { mealType, currentDate });
  };
  const calculateRemaningCalories = () => {
    return Math.round(goals.caloriesGoal - progress.kcal);
  };
  const handleDetails = (item) => {
    console.log(item.prop);
    const servingsAmt = item.servingsAmt;
    const prop = {
      name: item.prop.name,
      image: item.prop.image,
      nutriments: {
        calories: item.prop.nutriments.calories / servingsAmt,
        carbohydrates: item.prop.nutriments.carbohydrates / servingsAmt,
        fat: item.prop.nutriments.fat / servingsAmt,
        protein: item.prop.nutriments.protein / servingsAmt,
      },
    };
    console.log("RPORESPOR", prop);
    const mealType = item.mealType;

    const editMode = true;
    const itemId = item.id;
    navigation.navigate("FoodDetails", {
      prop,
      mealType,
      currentDate,
      servingsAmt,
      editMode,
      itemId,
    });
  };

  const renderRightActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1],
    });

    return (
      <TouchableOpacity
        onPress={() => handleDelete(itemId)}
        style={[styles.deleteButton]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const handleDelete = async (itemId) => {
    console.log("deelte");

    try {
      const date = getCurrentDate();
      const docRef = doc(
        db,
        "users",
        userId,
        "foodDiaries",
        date,
        "entries",
        itemId
      );
      await deleteDoc(docRef);
      setFoodDiaryList((prevList) =>
        prevList.filter((item) => item.id !== itemId)
      );
      const updatedTotals = calculateTotals(
        foodDiaryList.filter((item) => item.id !== itemId)
      );
      setProgress(updatedTotals);
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error deleting doc", e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Track Calories </Text>
        <View style={styles.dateHeader}>
          <TouchableOpacity onPress={handlePrevDate}>
            <View>
              <Text style={styles.arrowSize}>
                <Ionicons name="caret-back-outline" size={35} />
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.dateSize}>{formattedDate}</Text>
          <TouchableOpacity onPress={handleNextDate}>
            <Text style={styles.arrowSize}>
              <Ionicons name="caret-forward-outline" size={35} />
            </Text>
          </TouchableOpacity>
        </View>
        {/* KCAL TRACKER */}
        <View style={[styles.mainTrackerContainer]}>
          <View style={[styles.card]}>
            <View style={[styles.consumedContainer]}>
              <View style={styles.consumedStyles}>
                <Text style={[styles.consumedHeader]}>Consumed</Text>
                <Text style={styles.consumedAmount}>
                  <Text style={styles.boldText}>
                    {Math.round(progress.kcal)}
                  </Text>
                  <Text> kcals</Text>
                </Text>
              </View>
              <View style={[styles.progressSection]}>
                <View>
                  <Progress.Circle
                    size={125}
                    thickness={7}
                    progress={progress.kcal / goals.caloriesGoal}
                    showsText
                    allowFontScaling
                    unfilledColor="#E6E6E6"
                    strokeCap="round"
                    borderWidth={0}
                    formatText={() => (
                      <Text style={styles.progressContainer}>
                        <Text style={styles.progressAmtTextStyle}>
                          {calculateRemaningCalories()}
                        </Text>
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
                  progress={progress.carbs / goals.carbsGoal}
                  width={width * 0.23}
                  height={7}
                  color="#87cefa"
                  unfilledColor="#E6E6E6"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>
                  {Math.round(progress.carbs)}g / {goals.carbsGoal}g
                </Text>
              </View>

              <View style={[styles.proteinTrackerContainer]}>
                <Text style={[styles.macroHeaderStyle, styles.flexStyle]}>
                  Protein
                </Text>
                <Progress.Bar
                  progress={progress.protein / goals.proteinGoal}
                  width={width * 0.23}
                  height={7}
                  color="#50C878"
                  unfilledColor="#E6E6E6"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>
                  {Math.round(progress.protein)}g / {goals.proteinGoal}g
                </Text>
              </View>

              <View style={[styles.fatsTrackerContainer]}>
                <Text style={[styles.macroHeaderStyle, styles.flexStyle]}>
                  Fats
                </Text>
                <Progress.Bar
                  progress={progress.fats / goals.fatGoal}
                  width={width * 0.23}
                  height={7}
                  color="#FF5733"
                  unfilledColor="#E6E6E6"
                  strokeCap="round"
                  borderWidth={0}
                />
                <Text style={styles.progressTextMacros}>
                  {Math.round(progress.fats)}g / {goals.fatGoal}g
                </Text>
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
                <Text style={styles.mealFontText}>
                  <MaterialCommunityIcons
                    name="egg-fried"
                    size={30}
                    color="black"
                  />
                  Breakfast
                </Text>
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
                  <Swipeable
                    key={item.id}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, item.id)
                    }
                  >
                    <TouchableOpacity onPress={() => handleDetails(item)}>
                      <View style={styles.expandedCard}>
                        <View style={styles.foodNameContainer}>
                          <Text>{item.prop.name}</Text>
                          <Text>{item.servingsAmt} serving(s)</Text>
                        </View>

                        <Text>{item.prop.nutriments.calories}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
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
                <Text style={styles.mealFontText}>
                  <MaterialIcons name="fastfood" size={24} color="black" />
                  Lunch
                </Text>
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
                  <Swipeable
                    key={item.id}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, item.id)
                    }
                  >
                    <TouchableOpacity onPress={() => handleDetails(item)}>
                      <View style={styles.expandedCard}>
                        <View style={styles.foodNameContainer}>
                          <Text>{item.prop.name}</Text>
                          <Text>{item.servingsAmt} serving(s)</Text>
                        </View>

                        <Text>{item.prop.nutriments.calories}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
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
                <Text style={styles.mealFontText}>
                  <MaterialCommunityIcons
                    name="food-turkey"
                    size={30}
                    color="black"
                  />
                  Dinner
                </Text>
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
                  <Swipeable
                    key={item.id}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, item.id)
                    }
                  >
                    <TouchableOpacity onPress={() => handleDetails(item)}>
                      <View style={styles.expandedCard}>
                        <View style={styles.foodNameContainer}>
                          <Text>{item.prop.name}</Text>
                          <Text>{item.servingsAmt} serving(s)</Text>
                        </View>

                        <Text>{item.prop.nutriments.calories}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
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
                <Text style={styles.mealFontText}>
                  <MaterialCommunityIcons
                    name="food-apple"
                    size={30}
                    color="black"
                  />
                  Snacks
                </Text>
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
                  <Swipeable
                    key={item.id}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, item.id)
                    }
                  >
                    <TouchableOpacity onPress={() => handleDetails(item)}>
                      <View style={styles.expandedCard}>
                        <View style={styles.foodNameContainer}>
                          <Text>{item.prop.name}</Text>
                          <Text>{item.servingsAmt} serving(s)</Text>
                        </View>

                        <Text>{item.prop.nutriments.calories}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                );
              }
            })}
        </View>
      </ScrollView>
      <Navbar navigation={navigation} active="TrackCalorie" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    paddingBottom: 20,
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
    height: 65,
    paddingTop: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
  },
  listExistsStyle: {
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  mealContainer: {
    display: "flex",
    flexDirection: "row",
  },
  plusSign: {
    width: 35,
    height: 35,
    backgroundColor: "#eaf4fe",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  mealFontContainer: {
    width: width * 0.8,
  },
  expandedCard: {
    height: "auto",
    flexDirection: "row",
    width: width * 0.929,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    marginLeft: 15,
    marginBottom: 2,
    backgroundColor: "white",
    // paddingLeft: 20,
    padding: 15,
    elevation: 5,
  },
  foodNameContainer: {
    width: width * 0.74,
    elevation: 5,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  arrowSize: {
    fontSize: 30,
  },
  dateSize: {
    fontSize: 17,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: 80,
    height: 67,
    marginRight: 15,
    marginLeft: -20,
  },
  deleteText: {
    color: "white",
    // marginBottom: 10,
  },
});
