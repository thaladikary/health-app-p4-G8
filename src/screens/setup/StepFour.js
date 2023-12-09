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
import Ionicons from "@expo/vector-icons/Ionicons";

export default function StepFour({ navigation, route }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const currentStep = 4;

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.progressContainer}>
        {[...Array(8)].map((_, index) => (
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
      <Text style={styles.steTextNumber}>Step 4 of 8</Text>
      <Text style={styles.mainLabel}>Select your Gender</Text>

      <View style={styles.genderOptionsContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            // selectedGender === "male" && <Ionicons name="man-outline" />
          ]}
          onPress={() => handleGenderSelect("male")}
        >
          <Image
            // source={require("../../assets/Setup-pages/man_gym.png")}
            style={styles.genderImage}
          />
          {selectedGender !== "male" ? (
            <View style={styles.iconMale}>
              <Ionicons name="man-outline" size={150} />
            </View>
          ) : (
            <View style={styles.iconMale}>
              <Ionicons name="man" size={150} />
            </View>
          )}

          <Text style={styles.genderOptionText}></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderOption,
            // selectedGender === "female" && { backgroundColor: "grey" },
          ]}
          onPress={() => handleGenderSelect("female")}
        >
          <Image
            // source={require("../../assets/Setup-pages/woman_gym.png")}
            style={styles.genderImage}
          />

          {selectedGender !== "female" ? (
            <View style={styles.iconFemale}>
              <Ionicons name="woman-outline" size={150} />
            </View>
          ) : (
            <View style={styles.iconFemale}>
              <Ionicons name="woman" size={150} />
            </View>
          )}

          <Text style={styles.genderOptionText}></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate("StepFive")}
        // onPress={handleNextStep}
      >
        <Text style={styles.previousButtonText}>Next Step</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate("StepThree")}
      >
        <Text style={styles.previousButtonText}>Previous Step</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 20,
    position: "relative",
  },

  mainLabel: {
    fontSize: 30,
    marginTop: 30,
    position: "absolute",
    top: 130,
    fontWeight: "bold",
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

  steTextNumber: {
    fontSize: 18,
    marginLeft: 10, // Adjust the spacing between the lines and the number
    color: "dodgerblue",
    fontFamily: "Georgia",
    fontWeight: "500",
    top: 41.5,
    position: "absolute",
  },

  genderOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },

  genderOption: {
    flex: 1,
    // backgroundColor: "#eee",
    padding: 10,
    margin: 5,
    marginBottom: 30,
    borderRadius: 40,
  },

  genderOptionText: {
    fontSize: 14, // Adjusted font size
    textAlign: "center",
    color: "black",
  },

  previousButton: {
    backgroundColor: "deepskyblue",
    margin: 5,
    //marginTop: 30,
    padding: 10,
    borderRadius: 30,
    width: "75%",
  },

  previousButtonText: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },

  genderImage: {
    width: 100,
    height: 100,
    marginBottom: 0,
    alignSelf: "center",
  },
  iconMale: {},
  iconFemale: {
    marginRight: -25,
  },
});
