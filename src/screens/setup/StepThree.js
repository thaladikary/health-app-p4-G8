import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useData } from "../../context/DataContext";

export default function StepThree({ navigation }) {
  const setSelectedWeight = useState(68);
  const { inputHeight, setInputHeight } = useData("");
  // const [measurement, setMeasurement] = useState({
  //   weight: "",
  //   unit: "cm",
  // });

  //I do not know if this is correct but it wouldnt work without it. Copied from StepOne
  const handleNextStep = async () => {
    // Check if inputAge is not empty before navigating to the next step
    if (inputAge.trim() !== "") {
      // const entryPath = `users/${userId}/userInfo`;
      // const docRef = await addDoc(collection(db, entryPath), { age: inputAge });
      navigation.navigate("StepTwo", { inputAge });
    } else {
      // You can add an alert or other feedback for the user to enter their age
      console.warn("Please enter your height");
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust the behavior based on the platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // Adjust the vertical offset as needed
    >
      {/* used for the Step Progress Lines */}
      <View style={styles.steText}>
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />

        <View style={styles.emptyLine} />
        <View style={styles.emptyLine} />

        <View style={styles.emptyLine} />
      </View>

      <Text style={styles.steTextNumber}>Step 3 of 7</Text>

      <View style={styles.mainLabelContainer}>
        {/* <Image source={require('../../assets/Setup-pages/height.png')} style={styles.mainLabelIcon}/> */}

        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="human-male-height"
            size={30}
            color="black"
          />
        </View>
        <Text style={styles.mainLabel}>Enter your Height</Text>
      </View>

      <TextInput
        style={styles.inputWeight}
        placeholder="68 cm"
        keyboardType="numeric"
        value={inputHeight}
        onChangeText={(text) => setInputHeight(text)}
        onFocus={() => {}}
        // onBlur={Keyboard.dismiss}
      ></TextInput>

      {/* This part is if we want to add an option for the measurement : cm and ft */}
      {/* <TouchableOpacity
                    style={[styles.unitButton, measurement.unit === 'ft' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setMeasurement((prev) => ({ ...prev, unit: 'ft' }))}
                >
                    <Text style={[styles.unitText, measurement.unit === 'ft' ? styles.selectedText : styles.unselectedText]}
                    >ft</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.unitButton, measurement.unit === 'cm' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setMeasurement((prev) => ({ ...prev, unit: 'cm' }))}
                >
                    <Text style={[styles.unitText, measurement.unit === 'cm' ? styles.selectedText : styles.unselectedText]}
                    >cm</Text>
                </TouchableOpacity> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.navigate("StepFour")}
          // onPress={handleNextStep}
        >
          <Text style={styles.previousButtonText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.navigate("StepTwo")}
        >
          <Text style={styles.previousButtonText}>Previous Step</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    margin: 20,
    position: "relative",
    //marginTop: 70,
  },

  steText: {
    flexDirection: "row",
    fontSize: 18,
    marginBottom: 20,
    position: "absolute",
    top: 0,
    marginTop: 70,
    color: "dodgerblue",
    fontWeight: "500",
    flexDirection: "row", // Use row direction for horizontal layout
    alignItems: "center", // Align items in the center

    zIndex: 1, // Add this line
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

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "dodgerblue",
  },

  emptyLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#ccc",
  },

  steTextNumber: {
    fontSize: 18,
    marginLeft: 10, // Adjust the spacing between the lines and the number
    color: "dodgerblue",
    fontWeight: "500",
    top: 41.5,
    position: "absolute",
  },

  inputWeight: {
    fontSize: 26,
    textAlign: "center",
    borderBottomWidth: 1,
    width: "70%",
    //marginVertical: 200,
    margin: 10,
    top: 280,
  },

  nextButton: {
    backgroundColor: "deepskyblue",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    width: "75%",
    borderRadius: 25,
    top: -50,
  },

  nextButtonText: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },

  previousButton: {
    backgroundColor: "deepskyblue",
    margin: 5,
    //marginTop: 30,
    padding: 10,
    borderRadius: 30,
    width: "75%",
    alignSelf: "center",
  },

  previousButtonText: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },

  unitText: {
    fontSize: 25,
    bottom: -10,
  },

  unitButton: {
    padding: 10,
    //need more
    marginBottom: 20,
  },
  selectedUnit: {
    borderBottomWidth: 2,
    borderColor: "black",
  },

  unselectedUnit: {
    borderBottomWidth: 1,
    borderColor: "grey",
  },

  selectedText: {
    fontWeight: "bold",
    color: "black",
  },

  unselectedText: {
    color: "grey",
  },

  icon: {
    marginTop: 25,
    marginRight: 10,
  },

  buttonContainer: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignContent: "center",
  },
});
