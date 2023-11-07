import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import Navbar from "../../components/Navbar";
export default function TrackCalories({ navigation }) {
  return (
    <View>
      <Text style={styles.header}>Track Calories</Text>
      <View style={styles.mainTrackerContainer}>
        <View style={styles.kcalTracker}>
          <Text style={styles.kcalTrackerInfo}>1900kcal consumed</Text>
          <Text style={styles.kcalTrackerInfo}>1200kcal remaining</Text>
          <Text style={styles.kcalTrackerProgress}>---PROGRESS BAR---</Text>
        </View>
        <View style={[styles.kcalTracker, styles.macroTracker]}>
          <Text style={styles.macroTrackerC}>Carbs</Text>
          <Text style={styles.macroTrackerP}>Protein</Text>
          <Text style={styles.macroTrackerF}>Fats</Text>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },

  mainTrackerContainer: {
    display: "flex",
  },

  kcalTracker: {
    height: 100,
    margin: 25,
    borderWidth: 2, // Border width
    borderColor: "black", // Border color
    borderRadius: 10,
  },

  kcalTrackerInfo: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },

  kcalTrackerProgress: {
    textAlign: "center",
    marginTop: 10,
  },

  macroTracker: {
    display: "flex",
    flexDirection: "row",
  },
});
