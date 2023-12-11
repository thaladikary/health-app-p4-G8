import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useUser } from "../../context/userContext";

export default function UserProfile({ navigation }) {
  const user = useUser();
  const [calorieInfo, setCalorieInfo] = useState({
    caloriesGoal: 0,
    carbsGoal: 0,
    proteinGoal: 0,
    fatGoal: 0,
  });
  const [personalInfo, setPersonalInfo] = useState({
    age: 0,
    gender: "",
    weight: { weight: 0, unit: "" },
    height: 0,
  });

  const [activityInfo, setActivityInfo] = useState({
    goal: 0,
    lbsGoalPerWeek: "",
    activity: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = user.uid;

        const querySnapshot = await getDocs(
          collection(db, "users", userId, "userInfo")
        );

        querySnapshot.forEach((doc) => {
          try {
            const data = doc.data();
            setCalorieInfo({
              "Calories(kcal)": data.caloriesIntake,
              "Carbs(g)": data.carbIntake,
              "Protein(g)": data.proteinIntake,
              "Fat(g)": data.fatIntake,
            });
            setPersonalInfo({
              Age: data.age,
              Gender: data.gender,
              Weight: { weight: data.weight.weight, unit: data.weight.unit },
              "Height(cm)": data.height,
            });
            setActivityInfo({
              "Weight goal": data.lbsGoalPerWeek,
              "Lbs goal per week": data.goal,
              "Activity State": data.activity,
            });
          } catch (e) {
            console.log("not workin");
          }
        });
      } catch (error) {
        console.error("Error fetching grocery items:", error);
      }
    };

    fetchUserInfo();
  }, []);
  const renderInfoList = (infoObject) => {
    return (
      <FlatList
        data={Object.entries(infoObject)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.infoItem}>
            <Text style={styles.keyText}>{`${item[0]}:`}</Text>
            <Text style={styles.valueText}>
              {typeof item[1] === "object"
                ? `${item[1].weight} ${item[1].unit}`
                : item[1]}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    // <ImageBackground
    //   source={require("../../assets/Setup-pages/white-background-1.jpg")}
    //   style={styles.backgroundImage}
    // >
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* Top Section */}
          <View style={styles.topSection}>
            <Text style={styles.profileText}>Profile</Text>
            <Ionicons name="person-circle-outline" size={100} />

            {/* User Name */}
            <Text style={styles.userName}>{``}</Text>
          </View>

          {/* Section with the infos  */}
          <Text style={styles.infoHeaderPersonal}>Personal Details</Text>
          <View style={styles.infoContainer}>
            {renderInfoList(personalInfo)}
          </View>

          <Text style={styles.infoHeaderCalories}>Calories Info</Text>
          <View style={styles.infoContainer}>
            {renderInfoList(calorieInfo)}
          </View>

          <Text style={styles.infoHeaderActivity}>Activity Info</Text>
          <View style={styles.infoContainer}>
            {renderInfoList(activityInfo)}
          </View>
        </View>
      </ScrollView>
      <Navbar navigation={navigation} active="Profile" />
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  // },

  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
  },

  topSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    // marginTop: -50, // Adjust the value based on your design
  },

  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
  },

  infoContainer: {
    // height: "100%",
    backgroundColor: "white",
    elevation: 5,
    margin: 25,
    marginTop: 1,
    borderRadius: 12,
  },

  infoHeaderPersonal: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  infoHeaderCalories: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  infoHeaderActivity: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  // infoItem: {
  //   display: "flex",
  //   flexDirection: "row",
  //   padding: 5,
  //   borderBottomWidth: 0.2,
  //   borderBottomColor: "black",
  // },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    margin: 15,
    borderColor: "gray",
    // paddingVertical: 20,
    // paddingHorizontal: 5,
  },
  keyText: {
    // fontWeight: "bold",
    fontSize: 15,
  },
  valueText: {
    // marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  lastItem: {
    borderBottomWidth: 0,
  },

  //---------------------------------------------------------------------------------

  //   topSectionBackground: {
  //     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
  //     padding: 20,
  //     borderRadius: 20,
  //     alignItems: 'center',
  //   },

  // userImage: {
  //   width: 140,
  //   height: 140,
  //   borderRadius: 50, // Assuming the user image is a circle
  //   marginBottom: 10,
  // },
  // infoContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   alignItems: "center", // Center items vertically
  //   backgroundColor: "white",
  //   padding: 20,
  //   marginTop: 10,
  //   borderRadius: 20,
  //   flex: 0.1,
  // },

  // infoColumn: {
  //   alignItems: "center",
  //   margin: 12,
  //   flex: 0.3,
  // },

  // infoItemValue: {
  //   fontSize: 20,
  //   marginBottom: 5,
  //   textAlign: "center",
  // },
  // infoItemLabel: {
  //   fontSize: 14,
  //   color: "gray",
  // },
  // divider: {
  //   height: "60%", // Adjust the height of the divider as needed
  //   width: 1,
  //   backgroundColor: "black", // Color of the divider
  //   fontWeight: "bold",
  // },

  //   infoContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //   },
  //   infoItem: {
  //     fontSize: 20,
  //   },

  //   divider: {
  //     fontSize: 20,
  //     color: 'black', // Color of the divider
  //     marginHorizontal: 10, // Adjust the spacing around the divider
  //   },
});
