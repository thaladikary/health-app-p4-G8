import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Navbar from "../../components/Navbar";
export default function GroceryList({ navigation }) {
  return (
    <View>
      <Text>GroceryList</Text>
      <Navbar navigation={navigation} active="Grocery" />
    </View>
  );
}
