import { useState } from "react";
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
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/userContext";
import { db } from "../../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StepOne({ navigation }) {
  //using this variable to store the age of the users, we also set the initial age at 18
  const setSelectedAge = useState(18);
  const [inputAge, setInputAge] = useState("");
  // const userId = useUser().uid;

  const currentStep = 1;

  const handleNextStep = async () => {
    // Check if inputAge is not empty before navigating to the next step
    if (inputAge.trim() !== "") {
      // const entryPath = `users/${userId}/userInfo`
      // const docRef = await addDoc(collection(db, entryPath), {age:inputAge});
      navigation.navigate("StepTwo");

      // navigation.navigate('StepTwo'  ,{inputAge});
    } else {
      // You can add an alert or other feedback for the user to enter their age
      console.warn("Please enter your age");
    }
  };
  //used for the age input
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ageItem}
      onPress={() => {
        setSelectedAge(item.value.toString());
        setInputAge("");
      }}
    >
      <Text style={styles.ageItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  // onValueChange is used to update the setSelectedAge
  return (
    <View style={styles.container} behavior="padding">
      {/* Using this progress line array (set to 8 steps) for the progress line. Every screen is going to have a currentStep variable */}

      <View style={styles.progressContainer}>
        {[...Array(7)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressLine,
              index < currentStep - 1 && styles.filledLine,
              index === currentStep - 1 && styles.currentLine,
            ]}
          />
        ))}
      </View>

      <Text style={styles.steTextNumber}>Step 1 of 7</Text>

      <View style={styles.mainLabelContainer}>
        {/* <Image
          // source={require("../../assets/Setup-pages/anti-aging.png")}
          style={styles.mainLabelIcon}
        /> */}

        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="account-clock-outline"
            size={30}
            color="black"
          />
        </View>

        <Text style={styles.mainLabel}>Enter your age</Text>
      </View>

      {/* we take inputs for the age 
                Age is STORED into inputAge */}
      <TextInput
        style={styles.inputAge}
        placeholder="18"
        keyboardType="numeric"
        value={inputAge}
        onChangeText={(text) => setInputAge(text)}
        onFocus={() => {}}
      ></TextInput>

      


      {/* NEXT STEP Button here */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", //this is what pushes the button down, the top in the top and the input in the middle
    alignItems: "center",
    padding: 16,
    margin: 20,
    position: "relative",
  },

  steTextNumber: {
    fontSize: 18,
    marginLeft: 10, // Adjust the spacing between the lines and the number
    color: "dodgerblue",
    fontFamily: "normal",
    fontWeight: "500",
    top: 41.5,
    position: "absolute",
  },

  progressContainer: {
    flexDirection: "row",
    marginBottom: 20,
    top: 70,
    position: "absolute",
  },

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#ccc",
  },

  filledLine: {
    backgroundColor: "dodgerblue",
  },

  currentLine: {
    backgroundColor: "dodgerblue",
  },

  mainLabel: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
    // top: -120,
  },

  mainLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 110,
  },

  mainLabelIcon: {
    width: 60,
    height: 60,
    marginRight: 5,
    resizeMode: "contain",
    top: 10,
  },

  nextButton: {
    backgroundColor: "deepskyblue",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    width: "75%",
    borderRadius: 25,
    // top: 100,
  },

  nextButtonText: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },

  inputAge: {
    fontSize: 26,
    textAlign: "center",
    borderBottomWidth: 1,
    width: "70%",
    //marginVertical: 200,
    margin: 20,
    top: 280,
  },

  icon: {
    marginTop: 25,
    marginRight: 15,
  },

  
});
